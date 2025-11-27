# N'adair Tours - Streamlined Implementation Plan

## ✅ Completed Setup

1. **Project Initialization** ✓
   - Next.js 15 with TypeScript, Tailwind, App Router
   - All dependencies installed
   - shadcn/ui components ready

2. **Database Setup** ✓
   - Drizzle schema (`lib/db/schema.ts`)
   - DB client (`lib/db/index.ts`)
   - Drizzle config (`drizzle.config.ts`)
   - Seed script with 10 tours (`lib/db/seed.ts`)

3. **Core Infrastructure** ✓
   - Zustand cart store with persist (`store/cart.ts`)
   - Zod validation schemas (`lib/validations.ts`)
   - Distinctive design system (Playfair Display + Inter, earthy Scottish palette)

4. **Cleanup** ✓
   - Removed Vercel boilerplate
   - Updated metadata and fonts

## 🚀 Next Steps (Priority Order)

### Phase 1: Layout & Navigation (30 min)

**Goal:** Create reusable layout components

1. **Header Component** (`components/layout/Header.tsx`)
   - Logo/brand name
   - Navigation links (Home, Tours, Cart)
   - Cart badge with item count
   - Responsive mobile menu

2. **Footer Component** (`components/layout/Footer.tsx`)
   - Company info
   - Links
   - SDG goals mention

3. **Update Root Layout** (`app/layout.tsx`)
   - Include Header and Footer
   - Proper structure

### Phase 2: Home Page (45 min)

**Goal:** Beautiful landing page with hero and featured tours

1. **Hero Section**
   - Large, atmospheric background
   - Compelling headline
   - CTA button
   - Smooth animations

2. **Featured Tours Section**
   - Display 6 tours in grid
   - Tour cards with images
   - Link to tour details

3. **Sustainability Section**
   - About SDG goals
   - Visual representation

### Phase 3: Tours Pages (1.5 hours)

**Goal:** Browse and view tours

1. **Tours List Page** (`app/(public)/tours/page.tsx`)
   - Grid layout (responsive: 1/2/3 columns)
   - Pagination (9 per page)
   - Tour cards
   - Server Component with searchParams

2. **Tour Details Page** (`app/(public)/tours/[id]/page.tsx`)
   - Image gallery
   - Full description
   - Itinerary accordion
   - SDG badges
   - Add to cart button
   - Pricing info

3. **Tour Card Component** (`components/tours/TourCard.tsx`)
   - Reusable card design
   - Image, title, price, duration
   - Link to details

### Phase 4: Cart & Booking (1.5 hours)

**Goal:** Complete booking flow

1. **Cart Page** (`app/(public)/cart/page.tsx`)
   - Display cart items
   - Update quantities
   - Remove items
   - Total price
   - Proceed to checkout button

2. **Booking Form** (`app/(public)/booking/page.tsx`)
   - React Hook Form + Zod validation
   - All required fields
   - Date picker for booking date
   - Submit to server action

3. **Booking Confirmation** (`app/(public)/booking/confirmation/page.tsx`)
   - Order summary
   - Order number
   - Clear cart on load

4. **Server Actions** (`actions/orders.ts`)
   - Create order action
   - Validation
   - Database insert

### Phase 5: Admin Panel (2 hours)

**Goal:** Full admin CRUD

1. **NextAuth Setup** (`lib/auth.ts`)
   - Credentials provider
   - Admin login page
   - Middleware for protection

2. **Admin Dashboard** (`app/admin/page.tsx`)
   - Stats cards
   - Quick links

3. **Tours Management** (`app/admin/tours/page.tsx`)
   - Table with all tours
   - Pagination (10 per page)
   - Edit/Delete actions
   - Create new tour button

4. **Tour Form** (`app/admin/tours/new/page.tsx` & `[id]/page.tsx`)
   - Full CRUD form
   - Dynamic itinerary inputs
   - Image URL inputs
   - SDG checkboxes

5. **Orders Management** (`app/admin/orders/page.tsx`)
   - Table with all orders
   - Pagination (15 per page)
   - Status filter
   - View details

6. **Order Details** (`app/admin/orders/[id]/page.tsx`)
   - Full order info
   - Update status
   - Customer details

7. **Server Actions** (`actions/tours.ts`, `actions/admin.ts`)
   - Tour CRUD actions
   - Order status update
   - Auth checks

## 📋 Quick Reference

### File Structure

```
app/
├── (public)/
│   ├── page.tsx              # Home
│   ├── tours/
│   │   ├── page.tsx          # List
│   │   └── [id]/page.tsx    # Details
│   ├── cart/page.tsx
│   └── booking/
│       ├── page.tsx
│       └── confirmation/page.tsx
├── admin/
│   ├── layout.tsx            # Auth required
│   ├── page.tsx              # Dashboard
│   ├── login/page.tsx
│   ├── tours/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   └── orders/
│       ├── page.tsx
│       └── [id]/page.tsx
└── layout.tsx

components/
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
├── tours/
│   ├── TourCard.tsx
│   └── TourGrid.tsx
└── cart/
    └── CartItem.tsx

actions/
├── tours.ts
├── orders.ts
└── admin.ts
```

### Key Commands

```bash
# Push database schema
npx drizzle-kit push

# Seed database
pnpm tsx lib/db/seed.ts

# Run dev server
pnpm dev
```

### Environment Variables Needed

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

## 🎨 Design Principles

- **Typography:** Playfair Display (headings) + Inter (body)
- **Colors:** Deep forest greens, warm terracotta, soft sage
- **Atmosphere:** Subtle gradients, depth, Scottish-inspired
- **Motion:** Smooth fade-ins, slide-ups, staggered reveals
- **Responsive:** Mobile-first, 1/2/3 column grids

## ⚡ Quick Wins

1. Start with Header/Footer - gives structure
2. Build TourCard component - reuse everywhere
3. Create home page - visual impact
4. Tours list with pagination - core functionality
5. Cart flow - complete user journey
6. Admin panel - final piece

## 🐛 Common Issues to Watch

- Next.js Image component needs `next.config.ts` for Unsplash domains
- Server Actions need `'use server'` directive
- Zustand persist needs client component
- Pagination uses searchParams (Server Component)
- Auth middleware protects `/admin/*` routes

---

**Estimated Total Time:** 6-8 hours
**Current Progress:** ~80% (public site complete)
**Next Focus:** Admin panel (NextAuth + CRUD)
