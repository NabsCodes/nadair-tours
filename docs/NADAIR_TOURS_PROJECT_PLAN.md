# N'adair Tours - Complete Project Plan & Setup

## Project Overview

**Course:** CS312 Web Application Development  
**Project:** N'adair Tours Full Stack Website  
**Stack:** Next.js 15 + PostgreSQL + Drizzle ORM  
**Timeline:** 3-4 days  
**Deployment:** Vercel

---

## Tech Stack (Final Decision)

```
Frontend:
├── Next.js 15 (App Router, TypeScript)
├── Tailwind CSS
├── shadcn/ui components
├── React Hook Form + Zod
└── Zustand (cart state)

Backend:
├── Next.js Server Actions
├── PostgreSQL (Neon)
├── Drizzle ORM
└── NextAuth v5 (admin auth)

Deployment:
└── Vercel
```

### Why This Stack?

| Technology | Why? | Alternative Rejected |
|------------|------|---------------------|
| **Next.js 15** | Industry standard, built-in features, great DX | Create React App (outdated), Vite (needs backend setup) |
| **PostgreSQL** | Relational data (tours → orders), better for resumes | MongoDB (weaker relationships, overkill for simple data) |
| **Drizzle** | Lightweight, fast, type-safe, no generation step | Prisma (slower dev loop), Raw SQL (too much boilerplate) |
| **Server Actions** | Native, simple, perfect for CRUD | API Routes (more code), React Query (overkill) |
| **Zustand** | Tiny (1KB), perfect for cart | Redux (overkill), Context (more boilerplate) |
| **shadcn/ui** | Copy-paste components, accessible, saves 10+ hours | Building from scratch, Material UI (heavy) |

---

## Database Schema

```typescript
// PostgreSQL Schema (Drizzle)

Table: tours
├── id (serial, primary key)
├── title (text, not null)
├── description (text, not null)
├── price (numeric(10,2), not null)
├── duration (text, not null)
├── location (text, not null)
├── itinerary (jsonb, not null) // Array of day-by-day activities
├── images (jsonb, not null)     // Array of image URLs
├── sdg_goals (jsonb, not null)  // Array of UN SDG numbers [11, 12, 15]
├── max_capacity (integer)
├── created_at (timestamp)
└── updated_at (timestamp)

Table: orders
├── id (serial, primary key)
├── customer_name (text, not null)
├── customer_email (text, not null)
├── customer_phone (text, not null)
├── customer_address (text)
├── tour_items (jsonb, not null)  // Array of {tourId, quantity, price}
├── total_price (numeric(10,2), not null)
├── booking_date (date, not null)
├── status (text, default 'pending') // pending, confirmed, cancelled
├── notes (text)
├── created_at (timestamp)
└── updated_at (timestamp)

Table: admin_users
├── id (serial, primary key)
├── username (text, unique, not null)
├── password (text, not null) // bcrypt hashed
├── email (text, unique, not null)
├── created_at (timestamp)
└── updated_at (timestamp)
```

**Relationships:**
- `orders.tour_items` contains array of tour IDs (denormalized for simplicity)
- No foreign keys needed (JSONB handles it)
- Simple, fast queries

---

## Project Structure

```
nadair-tours/
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── page.tsx        # Home page
│   │   ├── tours/
│   │   │   ├── page.tsx    # Tours list (with pagination)
│   │   │   └── [id]/
│   │   │       └── page.tsx # Tour details
│   │   ├── cart/
│   │   │   └── page.tsx    # Shopping cart
│   │   └── booking/
│   │       ├── page.tsx    # Booking form
│   │       └── confirmation/
│   │           └── page.tsx # Booking confirmation
│   │
│   ├── admin/              # Admin panel
│   │   ├── layout.tsx      # Admin layout (requires auth)
│   │   ├── page.tsx        # Admin dashboard
│   │   ├── tours/
│   │   │   ├── page.tsx    # Manage tours
│   │   │   ├── new/
│   │   │   │   └── page.tsx # Create tour
│   │   │   └── [id]/
│   │   │       └── page.tsx # Edit tour
│   │   └── orders/
│   │       ├── page.tsx    # View all orders
│   │       └── [id]/
│   │           └── page.tsx # Order details
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts # NextAuth handlers
│   │
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── error.tsx           # Global error boundary
│
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── tours/
│   │   ├── TourCard.tsx
│   │   ├── TourGrid.tsx
│   │   ├── TourDetails.tsx
│   │   └── TourFilters.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartButton.tsx
│   ├── booking/
│   │   └── BookingForm.tsx
│   └── admin/
│       ├── ToursTable.tsx
│       ├── OrdersTable.tsx
│       ├── TourForm.tsx
│       └── OrderStatus.tsx
│
├── lib/
│   ├── db/
│   │   ├── index.ts        # DB client
│   │   ├── schema.ts       # Drizzle schema
│   │   ├── seed.ts         # Seed data
│   │   └── queries.ts      # Reusable queries
│   ├── auth.ts             # NextAuth config
│   ├── validations.ts      # Zod schemas
│   └── utils.ts            # Helper functions
│
├── store/
│   └── cart.ts             # Zustand cart store
│
├── actions/
│   ├── tours.ts            # Tour server actions
│   ├── orders.ts           # Order server actions
│   └── admin.ts            # Admin server actions
│
├── public/
│   ├── images/
│   │   ├── tours/          # Tour images
│   │   └── hero/           # Hero images
│   └── favicon.ico
│
├── drizzle/                # Drizzle migrations
├── .env.local              # Environment variables
├── drizzle.config.ts       # Drizzle configuration
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## Day-by-Day Implementation Plan

### **Day 1: Setup & Database (3-4 hours)**

#### 1.1 Project Initialization
```bash
# Create Next.js app
npx create-next-app@latest nadair-tours \
  --typescript \
  --tailwind \
  --app \
  --use-pnpm

cd nadair-tours
```

#### 1.2 Install Dependencies
```bash
# Database & ORM
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit

# Forms & Validation
pnpm add react-hook-form @hookform/resolvers/zod zod

# State Management
pnpm add zustand

# Authentication
pnpm add next-auth@beta bcryptjs
pnpm add -D @types/bcryptjs

# UI Components
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react

# Date handling
pnpm add date-fns
```

#### 1.3 Setup shadcn/ui
```bash
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add select
npx shadcn-ui@latest add calendar
```

#### 1.4 Setup Neon PostgreSQL
1. Go to https://neon.tech
2. Create free account
3. Create new project: "nadair-tours"
4. Copy connection string
5. Add to `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host/db"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

#### 1.5 Create Database Schema
```typescript
// lib/db/schema.ts
import { pgTable, serial, text, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const tours = pgTable('tours', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  duration: text('duration').notNull(),
  location: text('location').notNull(),
  itinerary: jsonb('itinerary').notNull().$type<string[]>(),
  images: jsonb('images').notNull().$type<string[]>(),
  sdgGoals: jsonb('sdg_goals').notNull().$type<number[]>(),
  maxCapacity: integer('max_capacity').default(20),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address'),
  tourItems: jsonb('tour_items').notNull().$type<{
    tourId: number;
    tourTitle: string;
    quantity: number;
    price: string;
  }[]>(),
  totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  bookingDate: date('booking_date').notNull(),
  status: text('status').default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

#### 1.6 Setup Drizzle Client
```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

#### 1.7 Push Schema & Seed Data
```bash
# Push schema to database
npx drizzle-kit push:pg

# Run seed script
pnpm tsx lib/db/seed.ts
```

**End of Day 1:** Database ready with sample tours

---

### **Day 2: Public Pages (6-8 hours)**

#### 2.1 Create Layout Components
- Header with navigation
- Footer with company info
- Responsive navigation

#### 2.2 Home Page
- Hero section with CTA
- Featured tours (6 tours)
- About sustainability section
- SDG goals section

#### 2.3 Tours List Page
- Grid layout (3 columns desktop, 1 mobile)
- Tour cards with image, title, price, duration
- **Pagination** (9 tours per page)
- Filter by location (optional)

#### 2.4 Tour Details Page
- Image gallery
- Full description
- Itinerary accordion
- Pricing & duration
- "Add to Cart" button
- SDG goals badges

**End of Day 2:** All public pages working, can browse tours

---

### **Day 3: Cart & Booking (6-8 hours)**

#### 3.1 Setup Zustand Cart Store
```typescript
// store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  tourId: number;
  tourTitle: string;
  price: string;
  duration: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (tourId: number) => void;
  updateQuantity: (tourId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.tourId === item.tourId);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.tourId === item.tourId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      
      removeItem: (tourId) => set((state) => ({
        items: state.items.filter(i => i.tourId !== tourId),
      })),
      
      updateQuantity: (tourId, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.tourId === tourId ? { ...i, quantity } : i
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

#### 3.2 Cart Page
- Display cart items
- Update quantities
- Remove items
- Show total price
- "Proceed to Checkout" button

#### 3.3 Booking Form
```typescript
// lib/validations.ts
import { z } from 'zod';

export const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().regex(/^[0-9]{10,15}$/, 'Invalid phone number'),
  customerAddress: z.string().min(5, 'Address must be at least 5 characters'),
  bookingDate: z.date().min(new Date(), 'Booking date must be in the future'),
  notes: z.string().optional(),
});
```

**Form fields:**
- Name (required)
- Email (required)
- Phone (required, validated)
- Address (required)
- Booking date (required, future dates only)
- Notes (optional)

#### 3.4 Create Order Server Action
```typescript
// actions/orders.ts
'use server';

import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { bookingSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  // Validate input
  const validated = bookingSchema.parse({
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail'),
    customerPhone: formData.get('customerPhone'),
    customerAddress: formData.get('customerAddress'),
    bookingDate: new Date(formData.get('bookingDate') as string),
    notes: formData.get('notes') || null,
  });

  // Get cart items from hidden field
  const cartItems = JSON.parse(formData.get('cartItems') as string);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  // Insert order
  const [order] = await db.insert(orders).values({
    ...validated,
    tourItems: cartItems,
    totalPrice: totalPrice.toString(),
    status: 'pending',
  }).returning();

  revalidatePath('/admin/orders');
  return order;
}
```

#### 3.5 Confirmation Page
- Show order number
- Display order summary
- Clear cart
- "Book another tour" link

**End of Day 3:** Full booking flow working

---

### **Day 4: Admin Panel (7-9 hours)**

#### 4.1 Setup NextAuth
```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const [admin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.username, credentials.username as string));

        if (!admin) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );

        if (!isValid) return null;

        return {
          id: admin.id.toString(),
          name: admin.username,
          email: admin.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin && !isLoggedIn) {
        return false; // Redirect to login
      }
      return true;
    },
  },
});
```

#### 4.2 Admin Login Page
- Simple login form
- Username & password fields
- Error handling
- Redirect to dashboard on success

#### 4.3 Admin Dashboard
- Welcome message
- Stats cards:
  - Total tours
  - Total orders
  - Pending orders
  - Revenue this month
- Quick actions

#### 4.4 Manage Tours Page
**Features:**
- Table showing all tours
- Columns: ID, Title, Location, Price, Duration, Actions
- Actions: Edit, Delete
- "Add New Tour" button
- **Pagination** (10 tours per page)

#### 4.5 Create/Edit Tour Form
```typescript
// lib/validations.ts
export const tourSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  price: z.number().positive('Price must be positive'),
  duration: z.string().min(1, 'Duration is required'),
  location: z.string().min(2, 'Location is required'),
  itinerary: z.array(z.string()).min(1, 'At least one itinerary item required'),
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  sdgGoals: z.array(z.number()).min(1, 'At least one SDG goal required'),
  maxCapacity: z.number().int().positive().default(20),
});
```

**Form fields:**
- Title
- Description (textarea)
- Price (number)
- Duration
- Location
- Itinerary (dynamic list)
- Images (URL inputs)
- SDG Goals (checkboxes: 11, 12, 15)
- Max Capacity

#### 4.6 Tour CRUD Server Actions
```typescript
// actions/tours.ts
'use server';

import { db } from '@/lib/db';
import { tours } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createTour(formData: FormData) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  // Validate and insert
  const [tour] = await db.insert(tours).values({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    duration: formData.get('duration') as string,
    location: formData.get('location') as string,
    itinerary: JSON.parse(formData.get('itinerary') as string),
    images: JSON.parse(formData.get('images') as string),
    sdgGoals: JSON.parse(formData.get('sdgGoals') as string),
    maxCapacity: parseInt(formData.get('maxCapacity') as string),
  }).returning();

  revalidatePath('/admin/tours');
  revalidatePath('/tours');
  return tour;
}

export async function updateTour(tourId: number, formData: FormData) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  await db.update(tours)
    .set({
      title: formData.get('title') as string,
      // ... other fields
      updatedAt: new Date(),
    })
    .where(eq(tours.id, tourId));

  revalidatePath('/admin/tours');
  revalidatePath('/tours');
}

export async function deleteTour(tourId: number) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  await db.delete(tours).where(eq(tours.id, tourId));

  revalidatePath('/admin/tours');
  revalidatePath('/tours');
}
```

#### 4.7 View Orders Page
**Features:**
- Table showing all orders
- Columns: ID, Customer, Email, Total, Booking Date, Status, Actions
- Filter by status (pending/confirmed/cancelled)
- **Pagination** (15 orders per page)
- View details button

#### 4.8 Order Details Page
- Customer information
- Booked tours list
- Total price
- Booking date
- Order notes
- **Update status** (pending → confirmed/cancelled)

**End of Day 4:** Complete admin panel with CRUD operations

---

### **Day 5: Polish & Testing (6-8 hours)**

#### 5.1 Error Handling
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page not found</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
```

#### 5.2 Loading States
```typescript
// app/tours/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
```

#### 5.3 Form Validation
- All forms use React Hook Form + Zod
- Client-side validation
- Server-side validation in actions
- Display error messages
- Prevent invalid submissions

#### 5.4 Responsive Design
**Breakpoints to test:**
- Mobile (375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1280px, 1920px)

**Key areas:**
- Navigation (hamburger menu on mobile)
- Tour grid (1 col → 2 col → 3 col)
- Forms (full width on mobile)
- Tables (horizontal scroll on mobile)

#### 5.5 Accessibility
```typescript
// Checklist:
✅ Semantic HTML (<header>, <nav>, <main>, <footer>)
✅ ARIA labels for icon buttons
✅ Keyboard navigation (Tab, Enter, Escape)
✅ Focus indicators
✅ Alt text for all images
✅ Proper heading hierarchy (h1 → h2 → h3)
✅ Form labels associated with inputs
✅ Error messages announced to screen readers
✅ Color contrast ratios (WCAG AA)
```

#### 5.6 Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={tour.images[0]}
  alt={tour.title}
  width={400}
  height={300}
  className="rounded-lg"
  priority // For hero images
/>
```

#### 5.7 SEO
```typescript
// app/layout.tsx
export const metadata = {
  title: 'N\'adair Tours | Sustainable Tourism in Scotland',
  description: 'Eco-conscious travel experiences across Scotland...',
};

// app/tours/[id]/page.tsx
export async function generateMetadata({ params }) {
  const tour = await getTour(params.id);
  return {
    title: `${tour.title} | N\'adair Tours`,
    description: tour.description.slice(0, 160),
  };
}
```

**End of Day 5:** Production-ready application

---

### **Day 6: Deployment & Documentation (3-4 hours)**

#### 6.1 Environment Variables
```env
# .env.local (local development)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# .env.production (Vercel)
DATABASE_URL="postgresql://..." # Neon production DB
NEXTAUTH_SECRET="..." # Different from dev
NEXTAUTH_URL="https://nadair-tours.vercel.app"
```

#### 6.2 Deploy to Vercel
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

#### 6.3 Create Admin User
```bash
# Run script to create admin user in production
pnpm tsx scripts/create-admin.ts
```

#### 6.4 Test Production
- Test all pages
- Test booking flow
- Test admin login
- Test CRUD operations
- Check mobile responsiveness
- Verify SSL certificate

#### 6.5 Write Reflective Questions
**Answer these in 2 A4 pages:**

1. **What was the most challenging part of the project and how did you overcome it?**
   - Example: "Implementing pagination with Server Components..."

2. **Why did you structure your database and booking flow the way you did?**
   - Example: "I chose PostgreSQL over MongoDB because..."

3. **How did you ensure usability and accessibility?**
   - Example: "I implemented ARIA labels, semantic HTML..."

4. **What would you improve if you had more time?**
   - Example: "I would add email notifications, payment integration..."

#### 6.6 Record Video Demo (5-7 minutes)
**Script:**
1. **Intro (30s):** "Hi, I'm Hassan. This is N'adair Tours, a sustainable tourism booking platform..."
2. **Home Page (30s):** Show hero, featured tours, SDG section
3. **Browse Tours (1.5min):** 
   - Tours list page
   - Pagination
   - Click on tour
   - Tour details page
4. **Booking Flow (2min):**
   - Add to cart
   - View cart
   - Update quantities
   - Proceed to checkout
   - Fill booking form
   - Show confirmation
5. **Admin Panel (2.5min):**
   - Login
   - Dashboard
   - Manage tours (show table, pagination)
   - Create new tour
   - View orders
   - Update order status
6. **Technical Highlights (30s):**
   - "Built with Next.js 15, PostgreSQL, Drizzle ORM..."
   - "Responsive design, accessible, server-side rendering..."

**End of Day 6:** Deployed, documented, video recorded

---

## Seed Data Example

```typescript
// lib/db/seed.ts
import { db } from './index';
import { tours, adminUsers } from './schema';
import bcrypt from 'bcryptjs';

const sampleTours = [
  {
    title: "Highland Adventure: Glencoe & Ben Nevis",
    description: "Embark on a breathtaking journey through Scotland's most iconic landscapes. This tour takes you through the dramatic Glencoe valley, known for its towering peaks and rich history, before ascending Ben Nevis, Britain's highest mountain. Along the way, you'll learn about sustainable highland practices and local conservation efforts.",
    price: "185.00",
    duration: "3 days",
    location: "Scottish Highlands",
    itinerary: [
      "Day 1: Depart Edinburgh, arrive Glencoe, guided valley walk",
      "Day 2: Ben Nevis ascent (guided), summit at 1,345m",
      "Day 3: Fort William town visit, return to Edinburgh"
    ],
    images: [
      "https://images.unsplash.com/photo-1552913902-b2cdb7c04e2b", // Scottish highlands
      "https://images.unsplash.com/photo-1590507788470-e5c85a1b0c5d", // Mountain
      "https://images.unsplash.com/photo-1512850692650-a6133ee17d38"  // Glencoe
    ],
    sdgGoals: [11, 15],
    maxCapacity: 12,
  },
  {
    title: "Isle of Skye: Coastal Wonders",
    description: "Discover the magical Isle of Skye, where rugged coastlines meet ancient castles. This eco-friendly tour prioritizes local communities, staying in family-run B&Bs and dining at farm-to-table restaurants. Experience the Old Man of Storr, Fairy Pools, and Dunvegan Castle while supporting sustainable tourism practices.",
    price: "220.00",
    duration: "4 days",
    location: "Isle of Skye",
    itinerary: [
      "Day 1: Ferry to Skye, Portree town orientation",
      "Day 2: Old Man of Storr hike, Fairy Pools swim",
      "Day 3: Dunvegan Castle, local craft workshop",
      "Day 4: Quiraing circular walk, return ferry"
    ],
    images: [
      "https://images.unsplash.com/photo-1539085043514-831e58b1e50e", // Skye
      "https://images.unsplash.com/photo-1591522811280-a8759970b03f", // Fairy Pools
      "https://images.unsplash.com/photo-1556552169-9e8f56f5f5f5"  // Old Man of Storr
    ],
    sdgGoals: [11, 12, 15],
    maxCapacity: 10,
  },
  {
    title: "Edinburgh Heritage Walk",
    description: "Explore Edinburgh's UNESCO World Heritage sites on foot, learning about the city's sustainable urban development initiatives. This walking tour covers the Royal Mile, Edinburgh Castle, Holyrood Palace, and Arthur's Seat, with expert guides discussing the city's commitment to sustainable tourism and community engagement.",
    price: "75.00",
    duration: "1 day",
    location: "Edinburgh",
    itinerary: [
      "Morning: Royal Mile & Edinburgh Castle tour",
      "Lunch: Local sustainable restaurant",
      "Afternoon: Holyrood Palace & Arthur's Seat hike"
    ],
    images: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b", // Edinburgh Castle
      "https://images.unsplash.com/photo-1587186416816-b43e6c0d0f73", // Royal Mile
      "https://images.unsplash.com/photo-1584746084849-44e97e81b64e"  // Arthur's Seat
    ],
    sdgGoals: [11],
    maxCapacity: 20,
  },
  {
    title: "Loch Ness & Urquhart Castle",
    description: "Journey to the legendary Loch Ness and explore the historic ruins of Urquhart Castle. This tour emphasizes responsible wildlife watching and supports local conservation efforts. Learn about the Loch's ecosystem, local legends, and ongoing environmental protection initiatives.",
    price: "95.00",
    duration: "1 day",
    location: "Loch Ness",
    itinerary: [
      "Morning: Depart Edinburgh via Highland scenic route",
      "Midday: Urquhart Castle guided tour",
      "Afternoon: Loch cruise & wildlife spotting",
      "Evening: Return to Edinburgh"
    ],
    images: [
      "https://images.unsplash.com/photo-1585330273913-f5114c6c2f4b", // Loch Ness
      "https://images.unsplash.com/photo-1516704010858-e6e31a1e9c2f", // Urquhart Castle
      "https://images.unsplash.com/photo-1604166088142-e2a85f9bada4"  // Scottish lake
    ],
    sdgGoals: [15],
    maxCapacity: 16,
  },
  {
    title: "Cairngorms National Park Wildlife Safari",
    description: "Experience Scotland's largest national park on this wildlife-focused safari. Track red deer, golden eagles, and Scottish wildcats with expert naturalist guides. This tour partners with local conservation groups and contributes to habitat restoration projects.",
    price: "160.00",
    duration: "2 days",
    location: "Cairngorms National Park",
    itinerary: [
      "Day 1: Wildlife tracking workshop, afternoon safari drive",
      "Day 2: Dawn bird watching, conservation center visit"
    ],
    images: [
      "https://images.unsplash.com/photo-1610878180933-123728745d22", // Cairngorms
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee", // Red deer
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366"  // Scottish wilderness
    ],
    sdgGoals: [15],
    maxCapacity: 8,
  },
  {
    title: "Stirling Castle & Wallace Monument",
    description: "Step back in time at Stirling Castle and the National Wallace Monument. This historical tour explores Scotland's fight for independence while highlighting modern sustainable heritage preservation practices. Learn how historic sites can drive community development and responsible tourism.",
    price: "85.00",
    duration: "1 day",
    location: "Stirling",
    itinerary: [
      "Morning: Stirling Castle guided tour",
      "Lunch: Local heritage café",
      "Afternoon: Wallace Monument climb & exhibits"
    ],
    images: [
      "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5", // Stirling Castle
      "https://images.unsplash.com/photo-1551616825-0b1b9d8ebce0", // Wallace Monument
      "https://images.unsplash.com/photo-1587916181338-06b1e6f87446"  // Scottish castle
    ],
    sdgGoals: [11],
    maxCapacity: 18,
  },
  {
    title: "Orkney Islands: Neolithic Heritage",
    description: "Venture north to the Orkney Islands, home to some of Europe's best-preserved Neolithic sites. This archaeological tour includes Skara Brae, Ring of Brodgar, and Maeshowe, emphasizing sustainable island tourism and supporting local artisan communities.",
    price: "280.00",
    duration: "5 days",
    location: "Orkney Islands",
    itinerary: [
      "Day 1: Ferry to Orkney, Kirkwall orientation",
      "Day 2: Skara Brae & Ring of Brodgar",
      "Day 3: Maeshowe & local craft workshop",
      "Day 4: Coastal walk & seabird watching",
      "Day 5: Return journey"
    ],
    images: [
      "https://images.unsplash.com/photo-1585288766827-c3e09fdc36f5", // Skara Brae
      "https://images.unsplash.com/photo-1604881991249-3a58cfe6c1c3", // Ring of Brodgar
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19"  // Orkney coast
    ],
    sdgGoals: [11, 12],
    maxCapacity: 12,
  },
  {
    title: "West Highland Way Trekking",
    description: "Tackle Scotland's most famous long-distance trail over 4 days. This guided trek covers 95 miles from Milngavie to Fort William, staying in eco-friendly accommodations and supporting local communities along the route. Experience lochs, glens, and mountains while learning about sustainable hiking practices.",
    price: "450.00",
    duration: "5 days",
    location: "West Highland Way",
    itinerary: [
      "Day 1: Milngavie to Drymen (19km)",
      "Day 2: Drymen to Rowardennan (23km)",
      "Day 3: Rowardennan to Inverarnan (22km)",
      "Day 4: Inverarnan to Tyndrum (20km)",
      "Day 5: Tyndrum to Fort William (partial, 15km)"
    ],
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306", // Highland trail
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73", // Loch view
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"  // Mountain landscape
    ],
    sdgGoals: [11, 12, 15],
    maxCapacity: 10,
  },
  {
    title: "St Andrews: Golf & Coastal Heritage",
    description: "Discover the home of golf in this cultural tour of St Andrews. Visit the historic Old Course, explore medieval ruins, and walk the coastal paths. This tour highlights sustainable sports tourism and the town's commitment to preserving its unique heritage.",
    price: "120.00",
    duration: "1 day",
    location: "St Andrews",
    itinerary: [
      "Morning: Old Course tour & British Golf Museum",
      "Lunch: Sustainable seafood restaurant",
      "Afternoon: St Andrews Cathedral ruins, coastal walk"
    ],
    images: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b", // Golf course
      "https://images.unsplash.com/photo-1593786481405-d0e44e5e85e1", // St Andrews
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64"  // Scottish coast
    ],
    sdgGoals: [11],
    maxCapacity: 15,
  },
  {
    title: "Whisky Trail: Speyside Distilleries",
    description: "Taste Scotland's finest single malts on this Speyside whisky tour. Visit four traditional distilleries, learn about sustainable production methods, and support family-run operations. Includes tastings, cooper demonstrations, and insights into the whisky industry's environmental initiatives.",
    price: "175.00",
    duration: "2 days",
    location: "Speyside",
    itinerary: [
      "Day 1: Glenfiddich & Macallan distillery tours",
      "Day 2: Glenlivet & Balvenie tours, cooper workshop"
    ],
    images: [
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b", // Whisky barrels
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809", // Distillery
      "https://images.unsplash.com/photo-1628952405168-3c0e46dcdc5d"  // Whisky glass
    ],
    sdgGoals: [12],
    maxCapacity: 12,
  },
];

async function seed() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.insert(adminUsers).values({
    username: 'admin',
    password: hashedPassword,
    email: 'admin@nadair-tours.com',
  });

  // Insert tours
  await db.insert(tours).values(sampleTours);

  console.log('✅ Database seeded successfully!');
}

seed().catch(console.error);
```

---

## Testing Checklist

### Functionality
- [ ] Home page loads with featured tours
- [ ] Tours list page shows all tours
- [ ] Pagination works on tours list
- [ ] Individual tour details page loads
- [ ] Add to cart adds item to cart
- [ ] Cart displays correct items and totals
- [ ] Cart persists on page refresh
- [ ] Booking form validates all fields
- [ ] Order is created successfully
- [ ] Confirmation page shows order details
- [ ] Admin login works
- [ ] Admin dashboard displays stats
- [ ] Tours table shows all tours with pagination
- [ ] Create new tour form works
- [ ] Edit tour form works
- [ ] Delete tour works (with confirmation)
- [ ] Orders table shows all orders
- [ ] Order status can be updated
- [ ] Order details page displays correctly

### Validation
- [ ] Name field requires 2+ characters
- [ ] Email field validates email format
- [ ] Phone field validates phone number format
- [ ] Booking date must be in future
- [ ] Price must be positive number
- [ ] Tour title requires 5+ characters
- [ ] Description requires 50+ characters
- [ ] At least one image URL required
- [ ] At least one SDG goal selected

### Responsive Design
- [ ] Mobile (375px): Navigation hamburger works
- [ ] Mobile: Tour grid shows 1 column
- [ ] Mobile: Forms are full width
- [ ] Mobile: Tables scroll horizontally
- [ ] Tablet (768px): Tour grid shows 2 columns
- [ ] Desktop (1280px): Tour grid shows 3 columns
- [ ] Desktop: Admin tables display properly

### Accessibility
- [ ] All images have alt text
- [ ] Form labels are associated with inputs
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Semantic HTML used (<header>, <nav>, <main>, <footer>)
- [ ] ARIA labels on icon buttons
- [ ] Color contrast meets WCAG AA
- [ ] Heading hierarchy is correct (h1 → h2 → h3)

### Performance
- [ ] Images are optimized (Next.js Image component)
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] No console errors
- [ ] No unused dependencies

### Security
- [ ] Passwords are hashed (bcrypt)
- [ ] Admin routes require authentication
- [ ] SQL injection protected (Drizzle parameterized queries)
- [ ] XSS protected (React escapes by default)
- [ ] CSRF protection (NextAuth)
- [ ] Environment variables not exposed

---

## Video Recording Tips

### Equipment
- Use Loom, OBS Studio, or QuickTime (Mac)
- Microphone: Clear audio (test before recording)
- Resolution: 1920x1080 (1080p)
- Frame rate: 30fps minimum

### Recording Checklist
- [ ] Clear desktop (close unnecessary apps/tabs)
- [ ] Browser zoom at 100%
- [ ] No personal information visible
- [ ] Good internet connection (for live demo)
- [ ] Rehearse once before final recording
- [ ] Keep cursor movements smooth
- [ ] Speak clearly and at moderate pace

### Script Structure
1. **Opening (30s)**
   - "Hi, my name is [Your Name]"
   - "This is N'adair Tours, a sustainable tourism booking platform"
   - "Built with Next.js, PostgreSQL, and Drizzle ORM"

2. **Public Site (3min)**
   - Navigate through homepage
   - Show tours list with pagination
   - Click on specific tour
   - Explain features as you demo
   - Add tours to cart
   - Complete booking

3. **Admin Panel (2min)**
   - Login to admin
   - Show dashboard
   - Demonstrate CRUD operations
   - View and manage orders

4. **Technical Explanation (1min)**
   - Briefly explain tech choices
   - Highlight key features
   - Mention sustainability focus

5. **Closing (30s)**
   - Summarize what was built
   - Thank the viewer

### Video Editing
- Trim dead air at start/end
- Add title slide (optional)
- Ensure 5-7 minute length
- Export as MP4 (H.264 codec)
- Test video before submission

---

## Reflective Questions Guide

### Question 1: Most Challenging Part

**What to discuss:**
- Technical challenge (e.g., implementing pagination with Server Components)
- How you researched solutions
- What you learned
- How you overcame it

**Example answer:**
> "The most challenging part was implementing the basket functionality with server-side rendering. Initially, I tried using Server Components for the entire cart, but realized I needed client-side state for real-time updates. I overcame this by using Zustand for client-side cart state with localStorage persistence, while still using Server Actions for order creation. This taught me when to use client vs. server components effectively."

### Question 2: Database & Booking Flow Structure

**What to discuss:**
- Why you chose PostgreSQL over MongoDB
- Table relationships
- JSONB for flexible data (itineraries, images)
- Booking flow design decisions
- Data validation strategy

**Example answer:**
> "I structured the database with separate tours and orders tables, using JSONB for flexible fields like itineraries and images. This approach allowed me to store arrays without needing additional junction tables, simplifying queries. For the booking flow, I implemented a cart-based system where users can add multiple tours before checking out, stored in client-side state for performance, then persisted to the database only on order confirmation. This reduces database writes and improves user experience."

### Question 3: Usability & Accessibility

**What to discuss:**
- Responsive design approach
- Accessibility features implemented
- User testing (if any)
- Form UX considerations

**Example answer:**
> "I ensured usability through responsive design using Tailwind's breakpoint system, testing on mobile, tablet, and desktop. For accessibility, I implemented semantic HTML, ARIA labels for icon buttons, keyboard navigation support, and ensured WCAG AA color contrast. All forms use clear labels, error messages, and validation feedback. The booking flow is streamlined to three steps: browse, cart, checkout, minimizing user friction."

### Question 4: Future Improvements

**What to discuss:**
- Features you'd add (payment integration, email notifications)
- Performance optimizations (image CDN, caching)
- UX enhancements (tour reviews, live availability)
- Technical debt to address

**Example answer:**
> "With more time, I would add Stripe payment integration, automated email confirmations, and SMS notifications for booking updates. I'd implement image uploads to cloud storage (Cloudflare R2 or AWS S3) instead of URL inputs, add a review system for tours, and create a user account dashboard for customers to view their booking history. On the technical side, I'd add comprehensive unit and integration tests using Vitest and Playwright."

---

## Common Errors & Solutions

### Error 1: Database Connection Failed
**Problem:** `Error: connect ECONNREFUSED`  
**Solution:**
```bash
# Check .env.local file
# Ensure DATABASE_URL is correct
# Verify Neon database is running (check dashboard)
# Test connection:
pnpm drizzle-kit studio
```

### Error 2: NextAuth Session Not Found
**Problem:** Admin routes redirect to login even after logging in  
**Solution:**
```typescript
// Check NEXTAUTH_SECRET is set
// Verify NEXTAUTH_URL matches your domain
// Clear browser cookies and try again
// Check middleware.ts configuration
```

### Error 3: Cart Not Persisting
**Problem:** Cart clears on page refresh  
**Solution:**
```typescript
// Ensure Zustand persist middleware is configured:
import { persist } from 'zustand/middleware';

export const useCart = create(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'cart-storage' } // localStorage key
  )
);
```

### Error 4: Images Not Loading
**Problem:** Next.js Image component throws error  
**Solution:**
```typescript
// Add image domains to next.config.js:
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

### Error 5: Server Actions Not Working
**Problem:** "Server Actions must be async functions"  
**Solution:**
```typescript
// Ensure 'use server' directive at top of file:
'use server';

export async function myAction() {
  // Must be async
  await someAsyncOperation();
}
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables documented
- [ ] Database seeded with sample data
- [ ] Admin user created
- [ ] Build succeeds (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] TypeScript compiles (`pnpm tsc --noEmit`)

### Vercel Setup
- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] Vercel project created
- [ ] Environment variables added:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
- [ ] Production domain configured
- [ ] SSL certificate verified

### Post-Deployment
- [ ] Visit production URL
- [ ] Test all pages
- [ ] Test booking flow end-to-end
- [ ] Login to admin panel
- [ ] Create test tour
- [ ] Create test order
- [ ] Verify responsive design
- [ ] Check Lighthouse scores
- [ ] Monitor Vercel logs for errors

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [NextAuth v5](https://authjs.dev)

### Tools
- [Neon (PostgreSQL)](https://neon.tech)
- [Vercel](https://vercel.com)
- [Unsplash (Images)](https://unsplash.com)
- [Loom (Screen Recording)](https://loom.com)

### Design Inspiration
- [Dribbble - Travel Websites](https://dribbble.com/search/travel-website)
- [Behance - Tourism](https://www.behance.net/search/projects?search=tourism)

---

## Final Notes

### Time Management
- Don't over-engineer
- Focus on requirements first
- Polish after functionality works
- Use AI assistance (Cursor) wisely
- Take breaks to avoid burnout

### Code Quality
- Write clean, readable code
- Add comments for complex logic
- Keep components small and focused
- Reuse code where possible
- Follow TypeScript best practices

### Git Commits
```bash
git commit -m "feat: add tours listing page with pagination"
git commit -m "feat: implement cart functionality with Zustand"
git commit -m "feat: create booking form with validation"
git commit -m "feat: add admin authentication"
git commit -m "feat: implement tour CRUD operations"
git commit -m "style: improve responsive design"
git commit -m "docs: add README and deployment guide"
```

---

## Success Criteria

You'll know you've succeeded when:
- ✅ All 10 assignment requirements met
- ✅ Application deployed and accessible
- ✅ Video demonstrates all features
- ✅ Reflective questions answered thoughtfully
- ✅ Code is clean and well-organized
- ✅ Responsive on all devices
- ✅ Accessible to screen readers
- ✅ No critical bugs
- ✅ Admin panel fully functional
- ✅ Professional appearance

**Good luck! You've got this. 🚀**
