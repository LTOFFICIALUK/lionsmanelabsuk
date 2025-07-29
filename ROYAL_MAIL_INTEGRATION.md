# Royal Mail Click & Drop Integration

This document describes the Royal Mail Click & Drop integration implemented in the Blue Dream Tea UK checkout system.

## Overview

The checkout system now automatically submits orders to Royal Mail Click & Drop after successfully saving them to the database. This provides seamless order processing and tracking number generation.

## Features

- ✅ Automatic order submission to Royal Mail Click & Drop
- ✅ Shipping label generation
- ✅ Tracking number assignment
- ✅ Fallback handling for API failures
- ✅ Support for all shipping methods (Standard, Express, Next Day)
- ✅ Environment-based configuration

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```bash
# Royal Mail Click & Drop API Configuration
VITE_ROYAL_MAIL_API_KEY=your-royal-mail-api-key-here
VITE_ROYAL_MAIL_API_URL=https://api.clickanddrop.com/api/v1

# Royal Mail Sender Details (Optional - will use defaults if not set)
VITE_ROYAL_MAIL_SENDER_NAME=Blue Dream Tea UK
VITE_ROYAL_MAIL_SENDER_COMPANY=Blue Dream Tea UK
VITE_ROYAL_MAIL_SENDER_EMAIL=orders@bluedreamtea.co.uk
VITE_ROYAL_MAIL_SENDER_PHONE=+44 123 456 7890
VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE1=123 Tea Street
VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE2=Unit 1
VITE_ROYAL_MAIL_SENDER_CITY=London
VITE_ROYAL_MAIL_SENDER_COUNTY=Greater London
VITE_ROYAL_MAIL_SENDER_POSTCODE=SW1A 1AA

# Notification emails for Royal Mail (comma-separated)
VITE_ROYAL_MAIL_NOTIFICATION_EMAILS=orders@bluedreamtea.co.uk,admin@bluedreamtea.co.uk
```

### API Key Setup

1. Sign up for Royal Mail Click & Drop API access
2. Generate an API key from your Royal Mail account
3. Add the API key to your environment variables

## Shipping Service Codes

The integration maps shipping options to Royal Mail service codes:

| Shipping Option | Royal Mail Service | Service Code |
|----------------|-------------------|--------------|
| Standard Shipping | Royal Mail 2nd Class | CRL2 |
| Express Tracked Shipping | Royal Mail Tracked 24 | TPL1 |
| Next Day Delivery | Special Delivery Guaranteed by 1pm | SD1 |

## Order Flow

1. **Customer completes checkout**
   - Order is validated
   - Customer information is collected

2. **Database save**
   - Order is saved to Supabase database
   - Status: `pending`

3. **Royal Mail submission**
   - Order data is transformed to Royal Mail format
   - Order is submitted to Royal Mail Click & Drop
   - Shipping label is generated
   - Tracking number is assigned

4. **Database update**
   - Order status updated to `confirmed`
   - Tracking number saved to database

5. **Confirmation**
   - Customer redirected to order confirmation page
   - Cart is cleared

## Error Handling

### Royal Mail API Failure

If Royal Mail submission fails:
- Order remains saved in database
- Status updated to `pending_manual`
- Notes field updated with error details
- Customer still receives confirmation
- Admin can manually process the order later

### Network Errors

- Specific error messages for different failure types
- Graceful degradation
- Order still saved to database

## Testing

### Test the Integration

Run the test script to verify the integration:

```bash
# Test Royal Mail API connection
npm run test:royal-mail

# Or run the test file directly
npx tsx src/utils/test-royal-mail-integration.ts
```

### Manual Testing

1. Complete a test order through checkout
2. Check the browser console for Royal Mail API logs
3. Verify the order appears in your Royal Mail Click & Drop account
4. Check that tracking number is assigned

## Admin Panel

The admin panel (`/admin`) includes:
- Manual Royal Mail submission for failed orders
- Order status tracking
- Tracking number management

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Check your Royal Mail API key
   - Verify the key has the correct permissions

2. **Network Errors**
   - Check your internet connection
   - Verify Royal Mail API is accessible

3. **Service Code Mismatch**
   - Ensure shipping options match Royal Mail services
   - Check the service code mapping in `royal-mail-api.ts`

### Debug Mode

Enable debug logging by checking the browser console during checkout. The integration logs detailed information about:
- Order data transformation
- API requests and responses
- Error details

## Security

- API keys are stored in environment variables
- No sensitive data is logged
- HTTPS is required for production
- API responses are validated

## Support

For issues with the Royal Mail integration:
1. Check the browser console for error messages
2. Verify your API key and permissions
3. Test the connection using the test script
4. Contact Royal Mail support for API-specific issues 