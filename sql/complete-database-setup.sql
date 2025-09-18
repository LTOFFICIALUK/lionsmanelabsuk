-- =====================================================
-- BLUE DREAM TEA UK - COMPLETE DATABASE SETUP
-- =====================================================
-- Run this entire script in your new Supabase SQL Editor
-- This will create all tables, indexes, functions, and policies

-- =====================================================
-- 1. ORDERS TABLE
-- =====================================================

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

-- =====================================================
-- 2. DISCOUNT CODES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS discount_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    max_discount DECIMAL(10,2),
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 3. DISCOUNT CODE USAGE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS discount_code_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discount_code_id UUID NOT NULL REFERENCES discount_codes(id) ON DELETE CASCADE,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    order_total DECIMAL(10,2) NOT NULL
);

-- =====================================================
-- 4. INDEXES FOR PERFORMANCE
-- =====================================================

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Discount codes indexes
CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_is_active ON discount_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_discount_codes_start_date ON discount_codes(start_date);
CREATE INDEX IF NOT EXISTS idx_discount_codes_end_date ON discount_codes(end_date);

-- Discount code usage indexes
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_discount_code_id ON discount_code_usage(discount_code_id);
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_order_id ON discount_code_usage(order_id);
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_customer_email ON discount_code_usage(customer_email);

-- =====================================================
-- 5. FUNCTIONS
-- =====================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to increment discount code usage
CREATE OR REPLACE FUNCTION increment_discount_code_usage(discount_code_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_usage INTEGER;
    max_usage INTEGER;
BEGIN
    -- Get current usage and max usage
    SELECT current_uses, max_uses INTO current_usage, max_usage
    FROM discount_codes
    WHERE id = discount_code_id;
    
    -- Check if max uses reached
    IF max_usage IS NOT NULL AND current_usage >= max_usage THEN
        RETURN FALSE;
    END IF;
    
    -- Increment usage
    UPDATE discount_codes
    SET current_uses = current_uses + 1
    WHERE id = discount_code_id;
    
    RETURN TRUE;
END;
$$ language 'plpgsql';

-- =====================================================
-- 6. TRIGGERS
-- =====================================================

-- Trigger to automatically update the updated_at column for orders
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically update the updated_at column for discount_codes
CREATE TRIGGER update_discount_codes_updated_at
    BEFORE UPDATE ON discount_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_code_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Allow all operations on orders" ON orders
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Create policies for discount_codes table
CREATE POLICY "Allow all operations on discount_codes" ON discount_codes
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Create policies for discount_code_usage table
CREATE POLICY "Allow all operations on discount_code_usage" ON discount_code_usage
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- 8. SAMPLE DATA
-- =====================================================

-- Insert sample discount codes with proper configuration
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('WELCOME10', 'Welcome discount - 10% off orders over £20', 'percentage', 10.00, 20.00, 100, true),
('SAVE5', 'Save £5 on orders over £30', 'fixed', 5.00, 30.00, 50, true),
('FREESHIP', 'Free shipping on any order', 'fixed', 3.99, 0.00, 200, true),
('SUMMER20', 'Summer sale - 20% off everything', 'percentage', 20.00, 0.00, 75, true),
('NEWCUSTOMER', 'New customer discount - 15% off first order', 'percentage', 15.00, 15.00, 1000, true),
('UPGRADE15', 'Pre-purchase upgrade discount - 15% off larger quantities', 'percentage', 15.00, 0.00, 1000, true),
('ADDON25', 'Pre-purchase addon discount - 25% off additional products', 'percentage', 25.00, 0.00, 1000, true)
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    discount_type = EXCLUDED.discount_type,
    discount_value = EXCLUDED.discount_value,
    min_order_amount = EXCLUDED.min_order_amount,
    max_uses = EXCLUDED.max_uses,
    is_active = EXCLUDED.is_active,
    updated_at = timezone('utc'::text, now());

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================

-- Verify tables were created
SELECT 'Orders table created successfully' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders');
SELECT 'Discount codes table created successfully' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'discount_codes');
SELECT 'Discount code usage table created successfully' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'discount_code_usage');

-- Show sample discount codes
SELECT code, description, discount_type, discount_value, is_active FROM discount_codes ORDER BY created_at;
