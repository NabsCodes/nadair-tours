import {
  pgTable,
  serial,
  text,
  numeric,
  jsonb,
  timestamp,
  integer,
  date,
} from "drizzle-orm/pg-core";

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  location: text("location").notNull(),
  itinerary: jsonb("itinerary").notNull().$type<string[]>(),
  images: jsonb("images").notNull().$type<string[]>(),
  sdgGoals: jsonb("sdg_goals").notNull().$type<number[]>(),
  maxCapacity: integer("max_capacity").default(20),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  tourItems: jsonb("tour_items").notNull().$type<
    {
      tourId: number;
      tourTitle: string;
      quantity: number;
      price: string;
    }[]
  >(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  bookingDate: date("booking_date").notNull(),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
