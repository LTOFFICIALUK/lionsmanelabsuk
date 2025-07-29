# Admin Order Management Setup

This guide will help you set up the admin order management system with Supabase.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Choose your organization and give your project a name
4. Set a database password and select a region
5. Wait for the project to be created

## Step 2: Set up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql` into the editor
3. Click "Run" to create the orders table and indexes

## Step 3: Configure Environment Variables

1. In your Supabase project dashboard, go to Settings > API
2. Copy your "Project URL" and "anon public" key
3. Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: Vite requires environment variables to be prefixed with `VITE_` instead of `REACT_APP_`

## Step 4: Access Admin Panel

1. Start your development server: `npm start`
2. Navigate to `http://localhost:3000/admin`
3. Enter the authentication code: `1901012001`

## Features

### Admin Authentication
- Simple code-based authentication (code: `1901012001`)
- Session storage keeps you logged in during the browser session

### Order Management
- **View Orders**: See all orders in a sortable table
- **Search**: Search by order number, customer email, or name
- **Filter**: Filter orders by status (pending, confirmed, processing, shipped, delivered, cancelled)
- **Edit Orders**: Modify customer information, addresses, status, discounts, and notes
- **Delete Orders**: Remove orders from the system
- **Order Details**: View complete order information including items and totals

### Order Editing Capabilities
- Customer name, email, and phone
- Shipping address
- Order status
- Discount codes and amounts
- Tracking numbers
- Internal notes

## Order Statuses

- **Pending**: Order received, awaiting confirmation
- **Confirmed**: Order confirmed, ready for processing
- **Processing**: Order being prepared
- **Shipped**: Order shipped to customer
- **Delivered**: Order delivered successfully
- **Cancelled**: Order cancelled

## Database Schema

The orders table includes:
- Customer information (name, email, phone)
- Shipping and billing addresses
- Order items (stored as JSON)
- Pricing information (subtotal, discounts, shipping, total)
- Order status and tracking
- Timestamps for creation and updates

## Security Notes

- The admin panel requires authentication code access
- Row Level Security (RLS) is enabled on the orders table
- Environment variables keep your Supabase credentials secure
- In production, consider implementing more robust authentication

## Automatic Order Saving

Orders are automatically saved to Supabase when customers complete checkout. If Supabase is unavailable, orders fall back to localStorage as a backup.

## Support

If you encounter issues:
1. Check your Supabase project is active and accessible
2. Verify your environment variables are correctly set
3. Ensure the database schema was created successfully
4. Check the browser console for any error messages 