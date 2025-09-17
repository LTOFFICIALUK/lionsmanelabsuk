-- Create discount_codes table for Blue Dream Tea UK
-- Run this in your Supabase SQL Editor

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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_is_active ON discount_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_discount_codes_start_date ON discount_codes(start_date);
CREATE INDEX IF NOT EXISTS idx_discount_codes_end_date ON discount_codes(end_date);

-- Enable Row Level Security (RLS)
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations on discount_codes" ON discount_codes
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_discount_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_discount_codes_updated_at
    BEFORE UPDATE ON discount_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_discount_codes_updated_at();

-- Create a function to increment usage count
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

-- Insert some sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('WELCOME10', 'Welcome discount - 10% off orders over £20', 'percentage', 10.00, 20.00, 100, true),
('SAVE5', 'Save £5 on orders over £30', 'fixed', 5.00, 30.00, 50, true),
('FREESHIP', 'Free shipping on any order', 'fixed', 3.99, 0.00, 200, true),
('SUMMER20', 'Summer sale - 20% off everything', 'percentage', 20.00, 0.00, 75, true),
('NEWCUSTOMER', 'New customer discount - 15% off first order', 'percentage', 15.00, 15.00, 1000, true);

-- Add discount_code_usage table to track individual usage
CREATE TABLE IF NOT EXISTS discount_code_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discount_code_id UUID NOT NULL REFERENCES discount_codes(id) ON DELETE CASCADE,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    order_total DECIMAL(10,2) NOT NULL
);

-- Add indexes for discount code usage
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_discount_code_id ON discount_code_usage(discount_code_id);
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_order_id ON discount_code_usage(order_id);
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_customer_email ON discount_code_usage(customer_email);

-- Enable RLS on usage table
ALTER TABLE discount_code_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for usage table
CREATE POLICY "Allow all operations on discount_code_usage" ON discount_code_usage
    FOR ALL 
    TO anon, authenticated
    USING (true)
    WITH CHECK (true); 