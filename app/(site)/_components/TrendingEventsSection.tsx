import { prisma } from '@/prisma/client'
import React from 'react'
import EventGridCard from '../events/_components/EventGridCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TrendingEventSection = async () => {
  const events = await prisma.event.findMany({
    include: {
      category: true,
      orders: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 6,
  })
  return (
    <section className="bg-background w-full py-12 md:py-16 lg:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Trending Events This Week
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl">
              Don't miss out on these popular events happening soon
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 mb-8 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, key) => (
            <EventGridCard event={event} key={key} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TrendingEventSection
