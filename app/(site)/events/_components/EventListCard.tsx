import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventWithRelations } from "./EventsList";
import CoverImage from "@/components/cover-image";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/utils";
import { ArrowRightIcon, CalendarIcon, MapPinIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";

export default function EventListCard({ event }: { event: EventWithRelations }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md p-0">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 flex-shrink-0 sm:h-auto sm:w-2/5">
            <CoverImage imageUrl={event.image || "/placeholder.svg"} title={event.title} />
            <div className="absolute right-2 top-2">
              <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white/80">
                {event.category?.name}
              </Badge>
            </div>
          </div>
          <div className="flex flex-grow flex-col p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="capitalize font-semibold">{event.title}</h3>
              <span className="font-medium text-green-600">{formatPrice({price: event.price})}</span>
            </div>
            <p className="mb-4 line-clamp-2 text-muted-foreground">{event.description.slice(0, 150) + ' ...'}</p>
            <div className="mb-4 grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDate({date: event.date})} ({event.startTime} ~ {event.endTime})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <span>{event.orders?.length.toLocaleString()} attendees</span>
              </div>
            </div>
            <div className="mt-auto flex gap-2">
              <Button variant="outline" className="w-1/2 sm:w-auto">
                <ShoppingBagIcon />
                Add to cart
              </Button>
              <Button variant="ghost" size="sm" className="gap-1" asChild></Button>
              <Button className="w-1/2 sm:w-auto" asChild>
                <Link href={`/events/${event.id}`}>
                  Check Details <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
