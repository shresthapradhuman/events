import React from 'react'
import { Category, Event, Order } from '@/prisma/generated/prisma'
import EventGridCard from './EventGridCard'
import EventListCard from './EventListCard'


export type EventWithRelations = Event & {
  category: Category | null
  orders: Order[]
}

interface EventsListProps {
  events: EventWithRelations[]
  viewMode: 'grid' | 'list'
}

const EventsList = ({ events, viewMode }: EventsListProps) => {
  return events.map((event) =>
    viewMode === 'grid' ? (
      <EventGridCard key={event.id} event={event as Event & { category: Category; orders: Order[] }} />
    ) : (
      <EventListCard key={event.id} event={event} />
    )
  )
}

export default EventsList
