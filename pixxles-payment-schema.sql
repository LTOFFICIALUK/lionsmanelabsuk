-- Pixxles Payment Gateway Database Schema Updates
-- Add payment-related fields to the orders table

-- Add payment transaction fields to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_transaction_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_xref VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_authorisation_code VARCHAR(20),
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'card',
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_processed_at TIMESTAMP WITH TIME ZONE;

-- Add indexes for payment fields
CREATE INDEX IF NOT EXISTS idx_orders_payment_transaction_id ON orders(payment_transaction_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_xref ON orders(payment_xref);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Add comments to document the new fields
COMMENT ON COLUMN orders.payment_transaction_id IS 'Pixxles transaction ID from payment gateway';
COMMENT ON COLUMN orders.payment_xref IS 'Pixxles cross-reference for transaction tracking';
COMMENT ON COLUMN orders.payment_authorisation_code IS 'Bank authorization code from payment processor';
COMMENT ON COLUMN orders.payment_method IS 'Payment method used (card, etc.)';
COMMENT ON COLUMN orders.payment_status IS 'Payment status (pending, paid, failed, refunded)';
COMMENT ON COLUMN orders.payment_processed_at IS 'Timestamp when payment was processed';

-- Update existing orders to have default payment status
UPDATE orders 
SET payment_status = 'pending' 
WHERE payment_status IS NULL;

-- Create a view for payment analytics
CREATE OR REPLACE VIEW payment_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as payment_date,
    payment_status,
    COUNT(*) as order_count,
    SUM(total) as total_amount,
    AVG(total) as average_order_value
FROM orders 
WHERE payment_status IS NOT NULL
GROUP BY DATE_TRUNC('day', created_at), payment_status
ORDER BY payment_date DESC, payment_status;

-- Create a function to update payment status
CREATE OR REPLACE FUNCTION update_payment_status(
    order_id_param UUID,
    transaction_id_param VARCHAR(50),
    xref_param VARCHAR(100),
    auth_code_param VARCHAR(20),
    status_param VARCHAR(20)
)
RETURNS VOID AS $$
BEGIN
    UPDATE orders 
    SET 
        payment_transaction_id = transaction_id_param,
        payment_xref = xref_param,
        payment_authorisation_code = auth_code_param,
        payment_status = status_param,
        payment_processed_at = NOW(),
        updated_at = NOW()
    WHERE id = order_id_param;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON orders TO authenticated;
GRANT SELECT ON payment_analytics TO authenticated;
GRANT EXECUTE ON FUNCTION update_payment_status TO authenticated;

-- Create a table for payment logs (optional, for detailed tracking)
CREATE TABLE IF NOT EXISTS payment_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    transaction_id VARCHAR(50),
    xref VARCHAR(100),
    action VARCHAR(50) NOT NULL, -- 'sale', 'refund', 'cancel', etc.
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'GBP',
    status VARCHAR(20),
    response_code VARCHAR(10),
    response_message TEXT,
    request_data JSONB,
    response_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for payment logs
CREATE INDEX IF NOT EXISTS idx_payment_logs_order_id ON payment_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_transaction_id ON payment_logs(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_xref ON payment_logs(xref);
CREATE INDEX IF NOT EXISTS idx_payment_logs_created_at ON payment_logs(created_at);

-- Grant permissions for payment logs
GRANT SELECT, INSERT ON payment_logs TO authenticated;

-- Create a function to log payment events
CREATE OR REPLACE FUNCTION log_payment_event(
    order_id_param UUID,
    transaction_id_param VARCHAR(50),
    xref_param VARCHAR(100),
    action_param VARCHAR(50),
    amount_param DECIMAL(10,2),
    status_param VARCHAR(20),
    response_code_param VARCHAR(10),
    response_message_param TEXT,
    request_data_param JSONB DEFAULT NULL,
    response_data_param JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO payment_logs (
        order_id,
        transaction_id,
        xref,
        action,
        amount,
        status,
        response_code,
        response_message,
        request_data,
        response_data
    ) VALUES (
        order_id_param,
        transaction_id_param,
        xref_param,
        action_param,
        amount_param,
        status_param,
        response_code_param,
        response_message_param,
        request_data_param,
        response_data_param
    ) RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission for logging function
GRANT EXECUTE ON FUNCTION log_payment_event TO authenticated;

-- Add comments to document the payment logs table
COMMENT ON TABLE payment_logs IS 'Detailed payment transaction logs for audit and debugging';
COMMENT ON COLUMN payment_logs.action IS 'Payment action performed (sale, refund, cancel, etc.)';
COMMENT ON COLUMN payment_logs.request_data IS 'Original request data sent to payment gateway';
COMMENT ON COLUMN payment_logs.response_data IS 'Response data received from payment gateway'; 