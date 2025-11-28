import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  customerEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  customerPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9+\-\s()]{10,15}$/,
      "Phone number must be 10-15 digits (e.g., 07123456789)",
    )
    .refine((val) => {
      const digitsOnly = val.replace(/\D/g, "");
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }, "Phone number must contain 10-15 digits"),
  customerAddress: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),
  bookingDate: z
    .date({
      message: "Please select a valid date",
    })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Booking date must be today or in the future",
    }),
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
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
