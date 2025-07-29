-- Add discount codes for pre-purchase upsell page
-- Run this in your Supabase SQL Editor

-- UPGRADE15: 15% off for upgrade options
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('UPGRADE15', 'Pre-purchase upgrade discount - 15% off larger quantities', 'percentage', 15.00, 0.00, 1000, true);

-- ADDON25: 25% off for additional products
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('ADDON25', 'Pre-purchase addon discount - 25% off additional products', 'percentage', 25.00, 0.00, 1000, true);

-- Update existing codes if they already exist
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('UPGRADE15', 'Pre-purchase upgrade discount - 15% off larger quantities', 'percentage', 15.00, 0.00, 1000, true)
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    discount_type = EXCLUDED.discount_type,
    discount_value = EXCLUDED.discount_value,
    min_order_amount = EXCLUDED.min_order_amount,
    max_uses = EXCLUDED.max_uses,
    is_active = EXCLUDED.is_active,
    updated_at = timezone('utc'::text, now());

INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, max_uses, is_active) VALUES
('ADDON25', 'Pre-purchase addon discount - 25% off additional products', 'percentage', 25.00, 0.00, 1000, true)
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    discount_type = EXCLUDED.discount_type,
    discount_value = EXCLUDED.discount_value,
    min_order_amount = EXCLUDED.min_order_amount,
    max_uses = EXCLUDED.max_uses,
    is_active = EXCLUDED.is_active,
    updated_at = timezone('utc'::text, now()); 