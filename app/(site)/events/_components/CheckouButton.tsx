
import { Button } from '@/components/ui/button'
import { Event } from '@/prisma/generated/prisma'
import Link from 'next/link'
import React from 'react'
import Checkout from './Checkout'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'

const CheckoutButton = async({ event, className }: { event: Event, className?: string }) => {
  const session = await auth()
  const userId = session?.user?.id
  const hasEventFinisded = new Date(event.date) < new Date()

  return hasEventFinisded ? (
    <p className="p-2 text-red-400">Sorry, Tickets are no longer available</p>
  ) : (
    <>
      {session?.user ? (
        <Checkout event={event} userId={userId} className={className} />
      ) : (
        <Button className={cn("cursor-pointer",className)} asChild>
          <Link href={`/login?callbackUrl=/events/${event.id}`}>Get Tickets</Link>
        </Button>
      )}
    </>
  )
}

export default CheckoutButton
