-- Create orders table for Blue Dream Tea UK
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS orders (
    id text PRIMARY KEY,
    order_number text UNIQUE NOT NULL,
    customer_email text NOT NULL,
    customer_first_name text NOT NULL,
    customer_last_name text NOT NULL,
    customer_phone text NOT NULL,
    shipping_address_line1 text NOT NULL,
    shipping_address_line2 text,
    shipping_city text NOT NULL,
    shipping_postal_code text NOT NULL,
    shipping_country text NOT NULL DEFAULT 'United Kingdom',
    billing_email text NOT NULL,
    items jsonb NOT NULL,
    subtotal decimal(10,2) NOT NULL,
    discount_amount decimal(10,2) DEFAULT 0,
    discount_code text,
    shipping_cost decimal(10,2) NOT NULL,
    total decimal(10,2) NOT NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    tracking_number text,
    estimated_delivery text,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations on orders" ON orders
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 