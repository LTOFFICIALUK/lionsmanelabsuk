# Pixxles Payment Gateway Implementation Guide

## Overview

This guide documents the implementation of the Pixxles payment gateway integration for Blue Dream Tea UK, including security best practices, 3DS authentication, and compliance requirements.

## Architecture

```
Frontend (React) → API Route (Vercel) → Pixxles Gateway
     ↓                    ↓                  ↓
Payment Form         Signature Gen.     Card Processing
3DS Handling         Validation         3DS Challenge
     ↓                    ↓                  ↓
Callback Page ← Response Processing ← Payment Response
```

## Security Implementation

### 1. Signature Generation
- **Purpose**: Ensures data integrity and authenticity
- **Algorithm**: SHA-512 with sorted parameters
- **Location**: Server-side only (never in frontend)

### 2. Input Validation
```typescript
// Server-side validation
const validateTransactionData = (data: any): void => {
  const requiredFields = ['action', 'amount', 'currencyCode', 'orderRef'];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Additional validation logic...
};
```

### 3. Rate Limiting
- **Limit**: 10 requests per minute per IP
- **Implementation**: In-memory store (upgrade to Redis for production)
- **Purpose**: Prevent abuse and brute force attacks

### 4. CORS Configuration
- **Origin Restrictions**: Configurable allowed origins
- **Headers**: Limited to necessary headers only
- **Methods**: POST and OPTIONS only

## Payment Flow

### 1. Initial Payment Request
```typescript
const response = await pixxlesService.createSaleTransaction({
  amount: 29.99,
  currency: 'GBP',
  orderRef: 'ORDER-123',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+44123456789',
  customerAddress: '123 Main St',
  customerPostCode: 'SW1A 1AA',
  customerTown: 'London',
  customerCountryCode: 'GB',
  cardNumber: '4111111111111111',
  cardCVV: '123',
  cardExpiryMonth: '12',
  cardExpiryYear: '2025',
  customerIP: '192.168.1.1'
});
```

### 2. Response Handling
```typescript
if (pixxlesService.is3DSRequired(response)) {
  // Handle 3DS authentication
  handle3DSChallenge(response.threeDSURL, response.threeDSRequest);
} else if (pixxlesService.isTransactionSuccessful(response)) {
  // Payment successful
  onPaymentSuccess(response);
} else {
  // Payment failed
  const errorMessage = pixxlesService.getErrorMessage(response);
  onPaymentError(errorMessage);
}
```

## 3D Secure Implementation

### 1. Challenge Flow
1. Initial payment request returns `responseCode: '65802'`
2. Extract `threeDSRef` and `threeDSURL` from response
3. Create iframe and submit 3DS form to ACS
4. Handle response via `postMessage`
5. Continue with `continue3DSTransaction()`

### 2. Callback Handling
```typescript
// Payment callback page handles 3DS responses
const handle3DSResponse = async (event: MessageEvent) => {
  if (event.data.type === '3DS_RESPONSE') {
    const response = await pixxlesService.continue3DSTransaction(
      threeDSRef,
      event.data.threeDSResponse
    );
    // Process final response
  }
};
```

## Configuration

### Environment Variables

#### Frontend (.env)
```bash
VITE_PIXXLES_MERCHANT_ID=your_merchant_id
VITE_PIXXLES_SIGNATURE_KEY=your_signature_key
VITE_PIXXLES_ENVIRONMENT=sandbox
VITE_REDIRECT_BASE_URL=https://yourdomain.com
```

#### Backend (Vercel)
```bash
PIXXLES_MERCHANT_ID=your_merchant_id
PIXXLES_SIGNATURE_KEY=your_signature_key
PIXXLES_ENVIRONMENT=sandbox
PIXXLES_GATEWAY_URL=https://qa-transactions.pixxlesportal.com/direct
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Production Configuration
```bash
# Frontend
VITE_PIXXLES_ENVIRONMENT=production
VITE_REDIRECT_BASE_URL=https://bluedreamtea.co.uk

# Backend
PIXXLES_ENVIRONMENT=production
PIXXLES_GATEWAY_URL=https://transactions.pixxlesportal.com/direct
ALLOWED_ORIGINS=https://bluedreamtea.co.uk,https://www.bluedreamtea.co.uk
```

## Error Handling

### Response Codes
| Code | Description | User Message |
|------|-------------|--------------|
| 0 | Success | Transaction successful |
| 1 | Card declined | Card declined - please contact your card issuer |
| 51 | Insufficient funds | Insufficient funds - please check your account balance |
| 54 | Expired card | Expired card - please use a different card |
| 65802 | 3DS required | 3D Secure authentication required |

### Error Categories
1. **Validation Errors**: Input validation failures (400)
2. **Authentication Errors**: Signature verification failures (422)
3. **Rate Limiting**: Too many requests (429)
4. **Gateway Errors**: Pixxles gateway issues (500)
5. **Timeout Errors**: Request timeouts (408)

## Testing

### Test Cards
```javascript
// Successful transactions
'4111111111111111' // Visa
'5555555555554444' // Mastercard

// 3DS Challenge
'4000000000000002' // Requires 3DS authentication

// Declined transactions
'4000000000000069' // Expired card
'4000000000000119' // Processing error
```

### Test Scenarios
1. **Successful Payment**: Use valid test card
2. **3DS Challenge**: Use 3DS test card
3. **Card Declined**: Use declined test card
4. **Network Error**: Simulate network failure
5. **Timeout**: Simulate slow response

## Monitoring & Logging

### Key Metrics
- Transaction success rate
- 3DS completion rate
- Average response time
- Error rates by type

### Logging
```typescript
// Secure logging (no sensitive data)
console.log('Transaction initiated:', {
  orderRef: data.orderRef,
  amount: data.amount,
  currency: data.currency,
  cardMask: '****' + data.cardNumber.slice(-4)
});
```

## Compliance

### PCI DSS Requirements
- ✅ No card data stored
- ✅ Secure transmission (HTTPS)
- ✅ Input validation
- ✅ Error handling
- ✅ Audit logging

### 3DS Compliance
- ✅ Challenge flow implementation
- ✅ Frictionless flow support
- ✅ Error handling
- ✅ Fallback mechanisms

## Deployment Checklist

### Pre-Production
- [ ] Update environment variables
- [ ] Test all payment scenarios
- [ ] Verify 3DS flows
- [ ] Check error handling
- [ ] Validate CORS settings
- [ ] Test rate limiting

### Production
- [ ] Update gateway URLs
- [ ] Configure production credentials
- [ ] Set up monitoring
- [ ] Test live transactions
- [ ] Verify webhook endpoints
- [ ] Document rollback procedures

## Troubleshooting

### Common Issues

#### 1. 3DS Not Working
- **Symptoms**: 3DS iframe not loading
- **Causes**: CORS issues, invalid 3DS URL
- **Solutions**: Check redirect URL, verify CORS settings

#### 2. Signature Verification Failed
- **Symptoms**: 422 errors on responses
- **Causes**: Wrong signature key, parameter ordering
- **Solutions**: Verify signature key, check parameter sorting

#### 3. Rate Limiting Triggered
- **Symptoms**: 429 errors
- **Causes**: Too many requests from same IP
- **Solutions**: Implement exponential backoff, check legitimate usage

### Debug Commands
```bash
# Check environment variables
echo $PIXXLES_MERCHANT_ID

# Test API endpoint
curl -X POST https://yourdomain.com/api/payment/process \
  -H "Content-Type: application/json" \
  -d '{"action":"SALE","amount":"100","currencyCode":"826"}'

# Monitor logs
vercel logs --app=your-app-name
```

## Support

### Pixxles Support
- Technical Documentation: Contact Pixxles for official docs
- Support Email: [Contact Pixxles]
- Test Environment: qa-transactions.pixxlesportal.com

### Internal Support
- Implementation Questions: Development Team
- Configuration Issues: DevOps Team
- Business Questions: Product Team

## Changelog

### v1.2.0 (Current)
- ✅ Enhanced security validation
- ✅ Improved error handling
- ✅ Rate limiting implementation
- ✅ Better 3DS handling
- ✅ Configuration improvements

### v1.1.0
- ✅ 3DS authentication
- ✅ Signature validation
- ✅ Basic error handling

### v1.0.0
- ✅ Initial implementation
- ✅ Basic payment processing 