import { headers } from 'next/headers';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/app/(site)/orders/action';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') ?? '';

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Handle the checkout session completion
      // You can update your database here
      // For example: mark the order as paid, update user subscription, etc.
      console.log('Payment successful for session:', session.id);

      // You might want to:
      // 1. Update order status in your database
      const order = {
        stripeId: session.id,
        eventId: session.metadata?.eventId || '',
        buyerId: session.metadata?.buyerId || '',
        totalAmount: session.amount_total ? (session.amount_total / 100).toString() : '0',
      }
      const newOrder = await createOrder(order);
      return NextResponse.json({ message: 'OK', order: newOrder })
      // 2. Send confirmation email to customer
      // 3. Provision any digital goods
      // 4. Update inventory
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const error = err as Error;
    console.error('Webhook error:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
}
