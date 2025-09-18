-- =====================================================
-- BLUE DREAM TEA UK - DATABASE VERIFICATION
-- =====================================================
-- Run this script to verify your database setup is correct

-- Check if all tables exist
SELECT 
    'Tables Check' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') 
        THEN '✅ Orders table exists'
        ELSE '❌ Orders table missing'
    END as orders_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'discount_codes') 
        THEN '✅ Discount codes table exists'
        ELSE '❌ Discount codes table missing'
    END as discount_codes_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'discount_code_usage') 
        THEN '✅ Discount code usage table exists'
        ELSE '❌ Discount code usage table missing'
    END as discount_usage_status;

-- Check if indexes exist
SELECT 
    'Indexes Check' as check_type,
    COUNT(*) as total_indexes
FROM pg_indexes 
WHERE tablename IN ('orders', 'discount_codes', 'discount_code_usage');

-- Check if functions exist
SELECT 
    'Functions Check' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') 
        THEN '✅ Update timestamp function exists'
        ELSE '❌ Update timestamp function missing'
    END as update_function_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'increment_discount_code_usage') 
        THEN '✅ Increment usage function exists'
        ELSE '❌ Increment usage function missing'
    END as increment_function_status;

-- Check if triggers exist
SELECT 
    'Triggers Check' as check_type,
    COUNT(*) as total_triggers
FROM pg_trigger 
WHERE tgname IN ('update_orders_updated_at', 'update_discount_codes_updated_at');

-- Check if RLS is enabled
SELECT 
    'RLS Check' as check_type,
    tablename,
    CASE 
        WHEN rowsecurity = true THEN '✅ RLS enabled'
        ELSE '❌ RLS disabled'
    END as rls_status
FROM pg_tables 
WHERE tablename IN ('orders', 'discount_codes', 'discount_code_usage');

-- Check sample discount codes
SELECT 
    'Sample Data Check' as check_type,
    COUNT(*) as total_discount_codes,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_codes
FROM discount_codes;

-- Show all discount codes
SELECT 
    'Available Discount Codes' as info,
    code,
    description,
    discount_type,
    discount_value,
    min_order_amount,
    is_active
FROM discount_codes 
ORDER BY created_at;

-- Test order table structure
SELECT 
    'Orders Table Structure' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;

-- Test discount codes table structure
SELECT 
    'Discount Codes Table Structure' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'discount_codes' 
ORDER BY ordinal_position;
