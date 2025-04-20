import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BannerSection = () => {
  return (
    <section className="relative w-full bg-primary/10 py-12">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="py-2">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Organize Your Own Event
            </h2>
            <p className="mb-6 text-lg">
              Create, promote, and manage your events with our powerful platform. Reach thousands of
              potential attendees and grow your community.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={"/events/create"}>Host Event</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={"/how-it-works"}>Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] rounded-lg">
            <Image
              src="/banner.png?height=600&width=800"
              alt="Host an event"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
