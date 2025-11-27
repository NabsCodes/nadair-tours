# Setup Instructions

## Database Connection Error Fix

The error you're seeing (`getaddrinfo ENOTFOUND host`) means your `DATABASE_URL` environment variable is not set or is incorrect.

### Steps to Fix:

1. **Create a `.env.local` file** in the root of your project (if it doesn't exist):

   ```bash
   touch .env.local
   ```

2. **Get your Neon PostgreSQL connection string:**
   - Go to [Neon Console](https://console.neon.tech)
   - Select your project
   - Go to "Connection Details"
   - Copy the connection string (it should look like: `postgresql://user:password@host/dbname`)

3. **Add to `.env.local`:**

   ```env
   DATABASE_URL="postgresql://user:password@host/dbname"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate NEXTAUTH_SECRET:**

   ```bash
   openssl rand -base64 32
   ```

   Copy the output and use it as your `NEXTAUTH_SECRET` value.

5. **Push the database schema:**

   ```bash
   npx drizzle-kit push
   ```

6. **Seed the database:**

   ```bash
   pnpm tsx lib/db/seed.ts
   ```

7. **Restart your dev server:**
   ```bash
   pnpm dev
   ```

## Project Structure (Updated)

Routes are now directly in `app/` without route groups:

```
app/
├── page.tsx              # Home page
├── tours/
│   ├── page.tsx          # Tours list
│   └── [id]/page.tsx    # Tour details
├── cart/page.tsx
├── booking/
│   ├── page.tsx
│   └── confirmation/page.tsx
└── admin/                # (to be created)
```

## Why dotenv?

**Note:** We use `dotenv` because:

- `drizzle-kit` (CLI tool) doesn't automatically load `.env.local`
- `tsx` (for seed scripts) doesn't load `.env.local` automatically
- Next.js DOES load `.env.local` automatically, so no dotenv needed in app code
- We only load it in: `drizzle.config.ts` and `lib/db/index.ts` (for seed script)

## Common Issues

### Database Connection Fails

- Check that `.env.local` exists and has correct `DATABASE_URL`
- Verify your Neon database is running
- Check the connection string format
- Make sure you're using Neon serverless connection string (not direct postgres)

### Images Not Loading

- Seed images now use proper Unsplash URLs with query parameters
- If images still don't load, check your internet connection
- Unsplash may rate limit - images should work fine for development

### TypeScript Errors

- Run `pnpm tsc --noEmit` to check for type errors
- Make sure all dependencies are installed: `pnpm install`
