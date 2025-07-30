# Pixxles Payment Gateway Integration

This document explains how the Pixxles payment gateway has been integrated into the Blue Dream Tea UK checkout system.

## Overview

The Pixxles integration provides secure payment processing with 3D Secure authentication support. The implementation uses the Direct Integration method, which allows customers to stay on your website throughout the checkout process while maintaining PCI compliance.

## Files Created/Modified

### New Files
- `src/utils/pixxles-api.ts` - Main Pixxles service with signature calculation and transaction handling
- `src/components/PaymentForm.tsx` - Payment form component with card validation and 3DS support
- `PIXXLES_INTEGRATION.md` - This documentation file

### Modified Files
- `src/pages/checkout.tsx` - Integrated payment form as inline section in checkout flow

## Configuration

### Sandbox Environment (Current)
```typescript
const PIXXLES_CONFIG = {
  merchantID: '132779',
  signatureKey: 'gpfu2XDYLKWvbZi',
  gatewayUrl: 'https://qa-transactions.pixxlesportal.com/direct',
  environment: 'sandbox'
};
```

### Production Environment (To be updated)
When ready for production, update the configuration in `src/utils/pixxles-api.ts`:

```typescript
const PIXXLES_CONFIG = {
  merchantID: 'YOUR_PRODUCTION_MERCHANT_ID',
  signatureKey: 'YOUR_PRODUCTION_SIGNATURE_KEY',
  gatewayUrl: 'https://transactions.pixxlesportal.com/direct',
  environment: 'production'
};
```

## Features Implemented

### 1. Direct Integration
- Card details collected on your website
- Secure transmission to Pixxles gateway
- Signature verification for security

### 2. 3D Secure Support
- Automatic 3DS authentication when required
- Iframe-based challenge handling
- Seamless user experience

### 3. Card Validation
- Luhn algorithm for card number validation
- Expiry date validation
- CVV format validation
- Real-time error feedback

### 4. Error Handling
- Comprehensive error code mapping
- User-friendly error messages
- Graceful failure handling

### 5. Security Features
- SHA-512 signature calculation
- Request/response signature verification
- Secure card data transmission

## Integration Flow

### 1. Checkout Process
1. Customer fills out shipping/billing information
2. Clicks "Continue to Payment"
3. Payment form appears as a new section
4. Customer enters card details
5. Form validates card information
6. Payment request sent to Pixxles

### 2. Payment Processing
1. Card details sent to Pixxles with signature
2. Pixxles validates request and processes payment
3. If 3DS required, challenge is presented
4. Payment result returned to application
5. Order created in database with payment details
6. Customer redirected to confirmation page

### 3. 3D Secure Flow
1. Initial payment request sent
2. Pixxles responds with 3DS challenge URL
3. Hidden iframe created for ACS challenge
4. Customer completes authentication
5. 3DS response sent back to Pixxles
6. Final payment result received

## Testing

### Test Cards
Use these test cards for sandbox testing:

#### Visa Credit
- Card: `4929421234600821`
- CVV: `356`
- Address: `Flat 6 Primrose Rise 347 Lavender Road Northampton NN17 8YG`

#### Mastercard Credit
- Card: `5301250070000191`
- CVV: `419`
- Address: `25 The Larches Narborough Leicester LE10 2RT`

### Test Amounts
- £1.00 - £24.99: Successful authorization and settlement
- £25.00 - £49.99: Successful authorization, rejected settlement
- £50.00 - £74.99: Card referred, then successful
- £75.00 - £99.99: Card referred, then rejected
- £100.00 - £149.99: Card declined
- £150.00 - £199.99: Card declined - keep card
- £200.00 - £249.99: SCA required, then successful
- £250.00 - £299.99: SCA required, then declined

### 3D Secure Testing
Use expiry month to control 3DS behavior:
- Month 01-11: Various authentication statuses
- Month 12: Challenge required (non-frictionless)

## Security Considerations

### 1. Signature Calculation
All requests are signed using SHA-512 hash of:
- Sorted request parameters
- URL-encoded format
- Normalized line endings
- Secret signature key

### 2. Response Verification
All responses are verified by:
- Recalculating signature from response data
- Comparing with received signature
- Rejecting if signatures don't match

### 3. Card Data Handling
- Card details never stored on your server
- Direct transmission to Pixxles gateway
- PCI compliance maintained

## Error Handling

### Common Error Codes
- `0`: Transaction successful
- `1-99`: Standard authorization codes
- `51`: Insufficient funds
- `54`: Expired card
- `65`: SCA required
- `65802`: 3DS authentication required
- `65539`: Invalid credentials
- `65544`: Request malformed

### Error Messages
The system provides user-friendly error messages for common issues:
- Invalid card number
- Expired card
- Insufficient funds
- 3DS authentication required
- Network errors

## Production Deployment

### 1. Update Configuration
Replace sandbox credentials with production values:
```typescript
pixxlesService.updateConfig({
  merchantID: 'YOUR_PRODUCTION_MERCHANT_ID',
  signatureKey: 'YOUR_PRODUCTION_SIGNATURE_KEY',
  gatewayUrl: 'https://transactions.pixxlesportal.com/direct',
  environment: 'production'
});
```

### 2. SSL Certificate
Ensure your website has a valid SSL certificate for HTTPS.

### 3. IP Whitelisting
Configure your server's IP address with Pixxles for production access.

### 4. Testing
Perform test transactions with live cards to verify integration.

## Monitoring and Logging

### Console Logs
The integration includes comprehensive logging:
- Payment request details (without sensitive data)
- Pixxles response codes
- 3DS challenge details
- Error messages

### Database Storage
Payment information stored in orders table:
- `payment_transaction_id`: Pixxles transaction ID
- `payment_xref`: Pixxles cross-reference
- `payment_authorisation_code`: Bank authorization code
- `status`: Updated to 'paid' on successful payment

## Troubleshooting

### Common Issues

#### 1. Signature Verification Failed
- Check signature key is correct
- Verify request parameter sorting
- Ensure no extra whitespace in values

#### 2. 3DS Challenge Not Appearing
- Check iframe creation
- Verify ACS URL is accessible
- Check browser console for errors

#### 3. Payment Declined
- Verify test card numbers
- Check amount is within test ranges
- Review Pixxles response codes

#### 4. Network Errors
- Check gateway URL is correct
- Verify server can reach Pixxles
- Check firewall settings

### Debug Mode
Enable debug logging by checking browser console for detailed transaction information.

## Support

For technical support with the Pixxles integration:
1. Check this documentation
2. Review browser console logs
3. Test with known good test cards
4. Contact Pixxles support with transaction IDs

## API Reference

### PixxlesService Methods

#### `createSaleTransaction(orderData)`
Creates a new sale transaction with Pixxles.

#### `continue3DSTransaction(threeDSRef, threeDSResponse)`
Continues a 3DS transaction after challenge completion.

#### `is3DSRequired(response)`
Checks if 3DS authentication is required.

#### `isTransactionSuccessful(response)`
Checks if transaction was successful.

#### `getErrorMessage(response)`
Returns user-friendly error message.

#### `updateConfig(newConfig)`
Updates service configuration.

### PaymentForm Props

#### Required Props
- `amount`: Payment amount
- `currency`: Payment currency
- `orderRef`: Order reference
- `customerName`: Customer full name
- `customerEmail`: Customer email
- `customerPhone`: Customer phone
- `customerAddress`: Customer address
- `customerPostCode`: Customer postcode
- `customerTown`: Customer town
- `customerCountryCode`: Customer country code

#### Callback Props
- `onPaymentSuccess`: Called on successful payment
- `onPaymentError`: Called on payment error
- `onPaymentProcessing`: Called during processing

## Compliance

This integration complies with:
- PCI DSS requirements
- 3D Secure 2.0 standards
- Strong Customer Authentication (SCA)
- GDPR data protection

## Future Enhancements

Potential improvements:
1. Hosted payment page option
2. Recurring payment support
3. Refund processing
4. Advanced fraud detection
5. Multi-currency support
6. Apple Pay/Google Pay integration 