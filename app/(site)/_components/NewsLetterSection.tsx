import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const NewsLetterSection = () => {
  return (
    <section className="bg-primary w-full py-12 md:py-16 lg:py-24">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid items-center md:grid-cols-2">
          <div className="relative aspect-video">
            <Image
              src={'/subscription.png'}
              alt="newsletter"
              fill
              className="-mt-8 -ml-10 object-contain object-left-top"
            />
          </div>
          <div className="max-w-xl space-y-4">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold tracking-tight">
              Subscribe to our Newsletter!
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base">
              Get the latest updates on our events and exclusive deals. Be the
              first to know about our events.
            </p>
            <div className="space-y-5">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground h-12 text-base"
              />
              <Button variant="secondary" size={'lg'} className="uppercase">
                <SendIcon className="mr-1 inline-flex" />
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsLetterSection
