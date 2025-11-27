import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .regex(/^[0-9+\-\s()]{10,15}$/, "Invalid phone number format"),
  customerAddress: z.string().min(5, "Address must be at least 5 characters"),
  bookingDate: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Booking date must be today or in the future",
    }),
  notes: z.string().optional(),
});

export const tourSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Price must be a positive number"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(2, "Location is required"),
  itinerary: z.array(z.string()).min(1, "At least one itinerary item required"),
  images: z
    .array(z.string().url())
    .min(1, "At least one valid image URL required"),
  sdgGoals: z
    .array(z.number().int().min(1).max(17))
    .min(1, "At least one SDG goal required"),
  maxCapacity: z.number().int().positive(),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
