# Blue Dream Tea UK - Supabase Setup Guide

This guide will help you set up a new Supabase project for your Blue Dream Tea UK website.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `blue-dream-tea-uk`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users (Europe for UK)
4. Click **"Create new project"** (takes 2-3 minutes)

### Step 2: Get Your Project Credentials

1. Go to **Settings → API** in your new project
2. Copy these values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root
2. Copy the contents from `env.example` and update with your credentials:

```env
# Blue Dream Tea UK - Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Authentication
VITE_ADMIN_AUTH_CODE=your-admin-auth-code-here

# Royal Mail Click & Drop API Configuration
VITE_ROYAL_MAIL_API_KEY=your-royal-mail-api-key-here

# Royal Mail Sender Details
VITE_ROYAL_MAIL_SENDER_NAME=Everything Simple Limited
VITE_ROYAL_MAIL_SENDER_COMPANY=Everything Simple Limited
VITE_ROYAL_MAIL_SENDER_EMAIL=info@lionsmanelabs.co.uk
VITE_ROYAL_MAIL_SENDER_PHONE=+44 7375388796
VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE1=Everything Simple Limited
VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE2=Champions Business Park
VITE_ROYAL_MAIL_SENDER_CITY=Wirral
VITE_ROYAL_MAIL_SENDER_COUNTY=Merseyside
VITE_ROYAL_MAIL_SENDER_POSTCODE=CH49 0AB

# Notification emails for Royal Mail
VITE_ROYAL_MAIL_NOTIFICATION_EMAILS=info@lionsmanelabs.co.uk
```

### Step 4: Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Copy and paste the entire contents of `sql/complete-database-setup.sql`
4. Click **"Run"** to execute the script

This will create:
- ✅ Orders table with all necessary fields
- ✅ Discount codes table with validation
- ✅ Discount code usage tracking
- ✅ All indexes for performance
- ✅ Row Level Security policies
- ✅ Sample discount codes
- ✅ Automatic timestamp updates

### Step 5: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open your browser console and run:
   ```javascript
   window.debugSupabase()
   ```

3. You should see: ✅ Supabase connected successfully!

## 📊 What Gets Created

### Tables Created:

1. **`orders`** - Main order storage
   - Customer information
   - Shipping details
   - Order items (JSON)
   - Pricing and discounts
   - Status tracking
   - Timestamps

2. **`discount_codes`** - Promotional codes
   - Code validation rules
   - Usage limits
   - Date ranges
   - Active/inactive status

3. **`discount_code_usage`** - Usage tracking
   - Links orders to discount codes
   - Customer tracking
   - Usage analytics

### Features Included:

- ✅ **Row Level Security** - Secure data access
- ✅ **Automatic Timestamps** - Created/updated tracking
- ✅ **Performance Indexes** - Fast queries
- ✅ **Sample Data** - Ready-to-use discount codes
- ✅ **Validation Rules** - Data integrity
- ✅ **Cascade Deletes** - Clean data relationships

## 🔧 Advanced Configuration

### Custom Discount Codes

To add your own discount codes, use the SQL Editor:

```sql
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) 
VALUES ('YOURCODE', 'Your description', 'percentage', 10.00, 25.00, 100, true);
```

### Admin Panel Access

Set up admin access by updating your `.env`:
```env
VITE_ADMIN_AUTH_CODE=your-secure-admin-code
```

### Royal Mail Integration

Configure Royal Mail Click & Drop API:
1. Get API key from Royal Mail
2. Update `VITE_ROYAL_MAIL_API_KEY` in `.env`
3. Configure sender details

## 🚨 Troubleshooting

### Common Issues:

1. **"Supabase not configured" error**
   - Check your `.env` file exists
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
   - Restart your development server

2. **Database connection fails**
   - Check your project URL format
   - Verify your anon key is complete
   - Ensure your project is fully created (wait 2-3 minutes)

3. **Tables not found**
   - Run the complete database setup script
   - Check for any SQL errors in the Supabase dashboard
   - Verify RLS policies are created

4. **Permission denied errors**
   - Check Row Level Security policies
   - Verify your anon key has correct permissions
   - Test with the debug function

### Debug Commands:

```javascript
// Test connection
window.debugSupabase()

// Check environment variables
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET')
```

## 🎯 Next Steps

After setup is complete:

1. **Test order creation** - Place a test order
2. **Test discount codes** - Try the sample codes
3. **Check admin panel** - Verify order management works
4. **Configure email** - Set up order confirmation emails
5. **Set up monitoring** - Monitor your database usage

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Supabase dashboard for errors
3. Test with the debug functions
4. Check your browser console for detailed error messages

Your Blue Dream Tea UK website is now ready with a fully configured Supabase backend! 🎉
