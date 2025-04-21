'use server'

import config from '@/lib/config'
import { prisma } from '@/prisma/client'
import { createOrderSchema } from '@/schema'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { z } from 'zod'

const {
  stripe: { secretKey },
  baseUrl,
} = config

const stripe = new Stripe(secretKey, {
  apiVersion: '2025-03-31.basil',
})

interface CheckoutProps {
  eventId: string
  price: string
  isFree: boolean
  eventTitle: string
  buyerId: string
}




export async function checkoutAction(item: CheckoutProps) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: item.eventTitle,
          },
          unit_amount: parseInt(item.price),
        },
        quantity: 1,
      },
    ],
    metadata: {
      eventId: item.eventId,
      buyerId: item.buyerId,
    },
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}/cancel`,
  })
  redirect(session.url!)
}


export const createOrder = async (item: z.infer<typeof createOrderSchema>) => {
  try {
    const {data, success} = createOrderSchema.safeParse(item)
    if(!success) return {
      success: false,
      message: 'Invalid data'
    }
    const newOrder = await prisma.order.create({
      data:{
        stripeId: data.stripeId,
        totalAmount: data.totalAmount,
        eventId: data.eventId,
        userId: data.buyerId
      }
    })
    return {
      success: true,
      message: 'Order created successfully',
      orderId: newOrder.id
    }
  } catch (error) {
    console.log('Something went wrong' + error)
    return {
      success: false,
      message:'Something went wrong'
    }
  }
}