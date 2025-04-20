"use client";

import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface ViewModeToggleProps {
  currentViewMode: string;
}

const EventsViewModeToggle = ({ currentViewMode }: ViewModeToggleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleViewMode = (mode: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (mode) {
      params.set("view", mode);
    } else {
      params.delete("view");
    }

    router.push(`/events?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-none rounded-l-md cursor-pointer", currentViewMode === "grid" && "bg-muted")}
        onClick={() => toggleViewMode("grid")}
      >
        <GridIcon className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-none rounded-r-md cursor-pointer", currentViewMode === "list" && "bg-muted")}
        onClick={() => toggleViewMode("list")}
      >
        <ListIcon className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  );
};

export default EventsViewModeToggle;
