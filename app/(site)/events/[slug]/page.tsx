import CoverImage from '@/components/cover-image'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  HeartIcon,
  MapPinIcon,
  Share2Icon,
  StarIcon,
  TicketIcon,
  Users,
} from 'lucide-react'
import React from 'react'
import { formatDate, formatPrice } from '@/lib/utils'
import { Metadata } from 'next'
import { prisma } from '@/prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type PageProps = {
  params: Promise<{ id: string }>
}

const EventDetailPage = async ({ params }: PageProps) => {
  const { id } = await params
  const event = await prisma.event.findFirst({
    where: { id },
    include: {
      category: true,
      organizer: true,
      orders: true,
    },
  })
  return !event ? (
    <div className="container py-16 text-center">Event Not Found</div>
  ) : (
    <>
      <div className="container mx-auto max-w-screen-xl px-4 py-4">
        <Link href="/events" className="text-muted-foreground">
          <ArrowLeftIcon className="inline-block h-4 w-4" />
          Back to Events
        </Link>
      </div>
      <section className="relative">
        <div className="relative h-[300px] w-full overflow-hidden md:h-[400px] lg:h-[500px]">
          <CoverImage imageUrl={event.image} title={event.title} />
        </div>
        <div className="relative z-10 container mx-auto -mt-24 max-w-screen-xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
            {/* Event info */}
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant={'secondary'}>{event.category?.name}</Badge>
                {event.status === 'PUBLISHED' && (
                  <Badge variant={'secondary'}>Published</Badge>
                )}
                {event.status === 'CANCELLED' && (
                  <Badge variant={'destructive'}>Cancelled</Badge>
                )}
              </div>
              <h1 className="mb-4 text-2xl font-bold capitalize sm:text-3xl md:text-4xl">
                {event.title}
              </h1>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CalendarDaysIcon className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-muted-foreground text-sm">
                      {formatDate({ date: event.date })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground text-sm">
                      {event.venue}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-muted-foreground text-sm">
                      {event.orders.length}+ going
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TicketIcon className="text-muted-foreground mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-muted-foreground text-sm">
                      {event.organizer?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <HeartIcon className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Share2Icon className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            {/* Ticket purchase */}
            <div className="bg-background h-fit rounded-lg p-6 shadow-lg">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-2xl font-bold">
                  {formatPrice({ price: event.price })}
                </span>
                <div className="flex items-center text-sm">
                  <StarIcon className="fill-primary text-primary mr-1 h-4 w-4" />
                  <span>{4.5} (200 reviews)</span>
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <div className="flex justify-between rounded-md border p-3">
                  <div className="flex items-center">
                    <TicketIcon className="text-primary mr-2 h-5 w-5" />
                    <span>Ticket Price</span>
                  </div>
                  <span className="font-medium">
                    {formatPrice({ price: event.price })}
                  </span>
                </div>
              </div>

              <Button className="mb-3 w-full">Get Tickets</Button>

              <p className="text-muted-foreground text-center text-xs">
                Only {event.capacity} tickets left at this price
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-screen-xl px-6 py-12 md:px-0">
        <Tabs defaultValue="about">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold">About This Event</h2>
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = await prisma.event.findFirst({ where: { id } })

  return {
    title: event?.title,
    description: event?.description,
  }
}

export const dynamic = 'force-dynamic'

export default EventDetailPage
