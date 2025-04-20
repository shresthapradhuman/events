// React and Next.js imports
import { type FC } from 'react'
import Link from 'next/link'

// Third-party imports
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UsersIcon,
} from 'lucide-react'

// UI Components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import CoverImage from '@/components/cover-image'

// Types and utilities
import { type Event } from '@/prisma/generated/prisma'
import { formatDate, formatPrice } from '@/lib/utils'
import { type EventWithRelations } from './EventsList'

interface EventGridCardProps {
  event: Event & EventWithRelations
}

const EventGridCard: FC<EventGridCardProps> = ({ event }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <CoverImage
            imageUrl={event.image || '/placeholder.svg'}
            title={event.title || ''}
            className="object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
              {event.category?.name}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-2 p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2 truncate font-bold capitalize">
            {event.title}
          </h3>
          <span className="font-bold text-green-600">
            {event.price == '0' ? 'FREE' : formatPrice({ price: event.price })}
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="flex items-center flex-wrap">
              {formatDate({ date: event.date })} ( {event.startTime} ~ {event.endTime} )
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
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button asChild className='cursor-pointer'>
          <Link href={`/events/${event.id}`}>
            View Details
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className='cursor-pointer'>
          <ShoppingBagIcon className="h-4 w-4" /> Get Tickets
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EventGridCard
