"use client";
import React, { useState, useTransition } from "react";
import { eventSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import FileUpload from "@/components/file-upload";
import TimePicker from "@/components/time-picker";
import { toast } from "sonner";
import { DatePicker } from "@/components/date-picker";
import { createEventAction, updateEventAction } from "../actions";

import AddCategoryModal from "./AddCategoryModal";
import { Category, Event } from "@/prisma/generated/prisma";

type FormData = z.infer<typeof eventSchema>;

const EventForm = ({ event, categories }: { event?: Event; categories: Category[] }) => {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState<Category[]>(categories);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      status: event?.status || "DRAFT",
      capacity: event?.capacity || "",
      description: event?.description || "",
      date: event?.date || new Date(),
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
      venue: event?.venue || "",
      price: event?.price || "",
      image: event?.image || "",
      categoryId: event?.categoryId || "",
    },
  });
  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      const response = event
        ? await updateEventAction(event.id, values)
        : await createEventAction(values);
      if (response?.success) {
        toast.success(response.message, {
          style: { color: "green" },
        });
        router.push("/events");
        router.refresh();
      } else {
        toast.error(response?.message, {
          style: { color: "red" },
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mb-8 bg-background py-4">
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
            <CardDescription>Enter the basic information about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* title */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="text-base text-inherit">
                      Name your event
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="capitalize"
                        id={field.name}
                        placeholder="Enter event title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* category and status */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor={field.name} className="text-base text-inherit">
                          Choose Event Category
                        </FormLabel>
                        <AddCategoryModal setCategoriesData={setCategoriesData} />
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesData.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Current Event Status
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Drafted</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* date */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Date
                      </FormLabel>
                      <FormControl>
                        <DatePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <TimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        End Time
                      </FormLabel>
                      <FormControl>
                        <TimePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* location */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Venue
                      </FormLabel>
                      <FormControl>
                        <Input id={field.name} placeholder="Enter event venue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Capacity
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="capitalize"
                          id={field.name}
                          placeholder="People Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="text-base text-inherit">
                        Ticket Price
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {/* Currency unit */}
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                            ¥
                          </span>
                          <Input id={field.name} placeholder="1,000" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* description */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="text-base text-inherit">
                      Tell me about your event
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id={field.name}
                        placeholder="Enter event description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="mb-8 bg-background">
          <CardHeader>
            <CardTitle>Event Image</CardTitle>
            <CardDescription>Upload an image for your event.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      onFileChange={field.onChange}
                      folderName="events"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-start gap-4">
          <Button className="w-full cursor-pointer" disabled={isPending}>
            {isPending && <Loader className="mr-1 h-5 w-5 animate-spin" />}
            {isPending
              ? event
                ? "Updating Event"
                : "Creating Event"
              : event
                ? "Update Event"
                : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
