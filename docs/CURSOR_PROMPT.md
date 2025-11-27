# CURSOR PROMPT: Initialize N'adair Tours Project

## Context
I'm building a database-driven sustainable tourism booking website called N'adair Tours for a web development coursework assignment. This is a full-stack Next.js application with PostgreSQL database, focused on eco-friendly Scottish tours that align with UN Sustainable Development Goals.

## Tech Stack (FINAL)
- Next.js 15 (App Router, TypeScript)
- PostgreSQL (Neon)
- Drizzle ORM
- Server Actions (no API routes)
- React Hook Form + Zod
- Zustand (cart state only)
- Tailwind CSS + shadcn/ui
- NextAuth v5
- Vercel deployment

## Project Requirements

### Core Features (Must Have):
1. **Database-driven shop front** - Tours list from PostgreSQL
2. **Tour booking form** - Customer details, validation
3. **Tours database table** - title, description, price, images, itinerary, SDG goals
4. **Orders database table** - customer info, tour items, booking date, status
5. **Admin section** - Password-protected CRUD for tours and orders
6. **Pagination** - Tours list (9 per page)
7. **Tour extras** - Multiple images, itinerary, contextual info
8. **Error checking** - Form validation (React Hook Form + Zod)
9. **Basket system** - Add multiple tours, order in bulk
10. **Responsive styling** - Mobile, tablet, desktop

### Pages Required:
- Home (hero, featured tours, sustainability info)
- Tours List (grid, pagination, filters)
- Tour Details (gallery, itinerary, booking)
- Cart (view items, update quantities)
- Booking Form (customer details, validation)
- Booking Confirmation
- Admin Login
- Admin Dashboard
- Admin Tours Management (CRUD)
- Admin Orders View

## Database Schema

```sql
-- PostgreSQL schema for Drizzle

Table: tours
  id: serial PRIMARY KEY
  title: text NOT NULL
  description: text NOT NULL
  price: numeric(10,2) NOT NULL
  duration: text NOT NULL
  location: text NOT NULL
  itinerary: jsonb NOT NULL  -- Array of daily activities
  images: jsonb NOT NULL     -- Array of image URLs
  sdg_goals: jsonb NOT NULL  -- Array [11, 12, 15]
  max_capacity: integer DEFAULT 20
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()

Table: orders
  id: serial PRIMARY KEY
  customer_name: text NOT NULL
  customer_email: text NOT NULL
  customer_phone: text NOT NULL
  customer_address: text
  tour_items: jsonb NOT NULL  -- Array of {tourId, title, quantity, price}
  total_price: numeric(10,2) NOT NULL
  booking_date: date NOT NULL
  status: text DEFAULT 'pending'  -- pending, confirmed, cancelled
  notes: text
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()

Table: admin_users
  id: serial PRIMARY KEY
  username: text UNIQUE NOT NULL
  password: text NOT NULL  -- bcrypt hashed
  email: text UNIQUE NOT NULL
  created_at: timestamp DEFAULT now()
  updated_at: timestamp DEFAULT now()
```

## Initial Setup Tasks

### Phase 1: Project Initialization
1. Create Next.js 15 app with TypeScript, Tailwind, App Router
2. Install dependencies:
   - drizzle-orm, postgres
   - drizzle-kit (dev)
   - react-hook-form, @hookform/resolvers/zod, zod
   - zustand
   - next-auth@beta, bcryptjs, @types/bcryptjs
   - date-fns
3. Initialize shadcn/ui
4. Add shadcn components: button, card, form, input, textarea, table, dialog, badge, separator, select, calendar

### Phase 2: Database Setup
1. Create Drizzle schema file (`lib/db/schema.ts`) with tours, orders, admin_users tables
2. Create DB client (`lib/db/index.ts`) with Drizzle connection
3. Create Drizzle config (`drizzle.config.ts`)
4. Create seed script (`lib/db/seed.ts`) with 10 sample tours and 1 admin user
5. Setup Neon PostgreSQL (provide connection string in .env.local)
6. Push schema and seed database

### Phase 3: Core Structure
1. Create folder structure:
   - `app/(public)/` - public pages
   - `app/admin/` - admin pages
   - `components/` - reusable components
   - `lib/` - utilities, db, auth, validations
   - `store/` - Zustand cart store
   - `actions/` - Server Actions
2. Setup root layout with header/footer
3. Create basic navigation component

### Phase 4: Validation Schemas
Create Zod schemas for:
- Tour creation/update
- Booking form
- Admin login

## Sample Tours Data

Create 10 diverse Scottish tours:
1. Highland Adventure: Glencoe & Ben Nevis (£185, 3 days)
2. Isle of Skye: Coastal Wonders (£220, 4 days)
3. Edinburgh Heritage Walk (£75, 1 day)
4. Loch Ness & Urquhart Castle (£95, 1 day)
5. Cairngorms National Park Wildlife Safari (£160, 2 days)
6. Stirling Castle & Wallace Monument (£85, 1 day)
7. Orkney Islands: Neolithic Heritage (£280, 5 days)
8. West Highland Way Trekking (£450, 5 days)
9. St Andrews: Golf & Coastal Heritage (£120, 1 day)
10. Whisky Trail: Speyside Distilleries (£175, 2 days)

Each tour should have:
- 3 image URLs (use Unsplash)
- Detailed description (100+ words)
- 3-5 itinerary items
- SDG goals array (choose from [11, 12, 15])
- Location in Scotland
- Realistic pricing

## Design Guidelines

### Visual Style
- Color scheme: Earth tones (greens, browns, blues) reflecting sustainability
- Typography: Clean, modern sans-serif
- Layout: Card-based for tours, spacious whitespace
- Images: High-quality Scottish landscapes

### Responsive Breakpoints
- Mobile: 1 column grid (< 768px)
- Tablet: 2 column grid (768px - 1024px)
- Desktop: 3 column grid (> 1024px)

### Accessibility
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation
- Focus indicators
- Alt text for images
- Color contrast WCAG AA

## Specific Implementation Notes

### Cart Implementation (Zustand)
```typescript
// store/cart.ts
- items: CartItem[]
- addItem(tour)
- removeItem(tourId)
- updateQuantity(tourId, quantity)
- clearCart()
- getTotalPrice()
- getTotalItems()
- Use persist middleware with localStorage
```

### Pagination Implementation
- Server Components with searchParams
- Use `?page=1` URL parameter
- Display 9 tours per page (tours list)
- Display 10 tours per page (admin)
- Display 15 orders per page (admin)

### Server Actions Pattern
```typescript
'use server'
- Always start with auth check (admin actions)
- Use revalidatePath after mutations
- Return success/error objects
- Handle validation with Zod
```

### NextAuth Configuration
- Credentials provider only
- Admin login page at `/admin/login`
- Protect all `/admin/*` routes
- Use bcrypt for password hashing

## Environment Variables Needed

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..." (generate with openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
```

## Key Constraints

1. **No React Query** - Use Server Components and Server Actions
2. **No API routes** - Use Server Actions exclusively
3. **JSONB for arrays** - Store images, itinerary, SDG goals as JSONB
4. **Simple auth** - Just admin credentials, no user accounts
5. **No payment integration** - Just booking capture
6. **URL-based images** - No file uploads, use Unsplash URLs
7. **Denormalized orders** - Store tour info in order JSONB (no JOIN needed)

## Development Priorities

Day 1: Setup + Database + Seed
Day 2: Public pages (home, tours, details)
Day 3: Cart + Booking flow
Day 4: Admin panel + CRUD
Day 5: Polish + Testing

## What I Need From Cursor

1. **Initialize the project** with proper folder structure
2. **Generate all database schema code** (Drizzle)
3. **Create seed script** with 10 sample Scottish tours
4. **Setup Zustand cart store** with persist
5. **Create Zod validation schemas** for all forms
6. **Generate base components** (Header, Footer, TourCard, etc.)
7. **Setup NextAuth** with credentials provider
8. **Create Server Actions** for tours and orders CRUD
9. **Implement pagination logic** for tours list
10. **Setup responsive Tailwind config**

## Success Criteria

- Clean, production-ready code
- Type-safe (strict TypeScript)
- Accessible (WCAG AA)
- Responsive (mobile-first)
- Well-organized file structure
- Reusable components
- Clear naming conventions
- Minimal dependencies

## Commands to Run

```bash
# Install dependencies
pnpm install

# Setup shadcn
npx shadcn-ui@latest init

# Push database schema
npx drizzle-kit push:pg

# Run seed script
pnpm tsx lib/db/seed.ts

# Start development server
pnpm dev
```

## Important Notes

- This is an **educational project** (coursework assignment)
- Focus on **code quality** and **best practices**
- Must be **portfolio-worthy**
- Deadline is flexible (assignment already passed)
- Will be **video-demonstrated** (5-7 min)
- Must answer **reflective questions** about design decisions

---

**Cursor, please help me initialize this project with the complete setup, following modern Next.js 15 best practices. Start by creating the project structure, then move to database schema, then seed data, then basic components. Ask clarifying questions if needed, but prioritize getting a working foundation quickly.**
