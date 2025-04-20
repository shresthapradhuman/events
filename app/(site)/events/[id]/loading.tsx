import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EventDetailLoadingPage = () => {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <AspectRatio className="overflow-hidden rounded-lg bg-muted" ratio={16 / 9}>
            <Skeleton className="h-auto w-full" />
          </AspectRatio>
          <div className="flex flex-col space-y-6">
            <div>
              <Skeleton className="w-20 p-4" />
              <Skeleton className="text-3xl font-bold md:text-4xl" />
              <Skeleton className="w-full p-2" />
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </section>
  );
};

export default EventDetailLoadingPage;
