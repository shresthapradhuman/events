import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Full name is required" }).min(3, {
    message: "Full name must be atleast 3 characters or more",
  }),
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid Email." }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters or more" }),
});

export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid Email." }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters or more" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().nonempty().email({ message: "Invalid Email." }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters or more" }),
    confirmPassword: z.string().nonempty({ message: "Confirm password is required" }).min(6, {
      message: "Confirm Password must be atleast 6 characters or more.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password And Password doesn't match.",
    path: ["confirmPassword"],
  });

export const eventSchema = z
  .object({
    title: z
      .string()
      .nonempty({ message: "Title is required" })
      .min(3, { message: "Title must be atleast 3 characters or more" }),
    description: z
      .string()
      .nonempty({ message: "Description is required" })
      .min(3, { message: "Description must be atleast 3 characters or more" }),
    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]),
    capacity: z.string().nonempty({ message: "Capacity is required" }),
    date: z.date({
      required_error: "Date is required",
    }),
    startTime: z.string().nonempty({ message: "Start time is required" }),
    endTime: z.string().nonempty({ message: "End time is required" }),
    venue: z
      .string()
      .nonempty({ message: "Venue is required" })
      .min(3, { message: "Venue must be atleast 3 characters or more" }),
    price: z
      .string()
      .nonempty({ message: "Price is required" })
      .refine((price) => !isNaN(Number(price)) && Number(price) < 10000, {
        message: "Price must be less than 10,000",
      }),
    image: z.string().nonempty({ message: "Image is required" }),
    categoryId: z.string(),
  })
  .refine(
    ({ startTime, endTime }) => {
      return new Date(`1970-01-01T${startTime}`) < new Date(`1970-01-01T${endTime}`);
    },
    {
      message: "Start time must be before end time",
      path: ["endTime"],
    },
  );

export const eventsFiltersSchema = z.object({
  categories: z.array(z.string()).optional(),
  priceRange: z.array(z.number()).length(2),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});


export const createOrderSchema = z.object({
  stripeId: z.string().nonempty({ message: "Stripe Id is required" }),
  totalAmount: z.string().nonempty({ message: "Total amount is required" }),
  eventId: z.string().nonempty({ message: "Event Id is required" }),
  buyerId: z.string().nonempty({ message: "Buyer Id is required" }),
})