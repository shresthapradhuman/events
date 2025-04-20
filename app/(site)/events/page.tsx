import React from 'react'
import { prisma } from '@/prisma/client'
import EventsSearchInput from './_components/EventSearchInput'
import EventsViewModeToggle from './_components/EventsViewModeToggle'
import EventsFilters from './_components/EventsFilters'
import { cn } from '@/lib/utils'
import EventsList from './_components/EventsList'

type EventListProps = {
  searchParams: Promise<{
    view?: 'grid' | 'list'
    sort?: 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc'
    category?: string
    keyword?: string
  }>
}

const EventsListPage = async ({ searchParams }: EventListProps) => {
  const { view , sort, category, keyword } = await searchParams
  const viewMode = view === 'list' ? 'list' : 'grid'

  const events = await prisma.event.findMany({
    where: {
      OR: keyword
        ? [
            { title: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ]
        : undefined,
      category: category ? { slug: category } : undefined,
    },
    orderBy: {
      [sort?.split('-')[0] || 'createdAt']: sort?.split('-')[1] === 'asc' ? 'asc' : 'desc',
    },
    include: {
      category: true,
      orders: true,
    },
  })

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8 md:px-6">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
          <p className="text-muted-foreground">
            Find and book tickets for the best events in your area
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/3">
            <EventsSearchInput placeholder="Search events ..." />
          </div>
          <div className="flex items-center gap-4">
            <EventsFilters />
            <EventsViewModeToggle currentViewMode={viewMode} />
          </div>
        </div>
      </div>
      <div
        className={cn("flex flex-col gap-4", {
          "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3": viewMode == "grid",
        })}
      >
        {events.length > 0 ? <EventsList events={events} viewMode={viewMode}/> : <p>No events found</p>}
      </div>
    </div>
  )
}

export default EventsListPage
