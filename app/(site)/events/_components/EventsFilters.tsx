import { prisma } from "@/prisma/client";
import EventsCategoryFilters from "./EventsCategoryFilters";
import EventsSortFilters from "./EventSortFilters";


const EventsFilters = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="flex items-center gap-2">
      <EventsCategoryFilters categories={categories} />
      <EventsSortFilters />
    </div>
  );
};

export default EventsFilters;
