# Admin Access

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`

## Setup

1. Make sure your database is seeded:
   ```bash
   pnpm db:seed
   ```

2. The seed script creates an admin user with:
   - Username: `admin`
   - Password: `admin123` (hashed with bcrypt)
   - Email: `admin@nadair-tours.com`

## Access

Navigate to `/admin/login` and use the credentials above.

## Security Note

⚠️ **Change the default password in production!**

