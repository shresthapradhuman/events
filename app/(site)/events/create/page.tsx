import React from "react";
import EventForm from "../_components/EventForm";
import { prisma } from "@/prisma/client";

const CreateEventPage = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="container mx-auto flex max-w-screen-xl flex-col p-4">
      <EventForm categories={categories} />
    </div>
  );
};

export default CreateEventPage;
