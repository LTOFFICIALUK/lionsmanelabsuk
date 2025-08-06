# 🧪 Pixxles Payment Testing Guide

## 🚀 Quick Start

1. **Start the development environment**:
   ```bash
   npm run dev:full
   ```

2. **Navigate to checkout**: http://localhost:5177/checkout

3. **Use the Test Panel**: The payment test panel will appear in development mode, allowing you to easily test different scenarios.

## 💳 Official Pixxles Test Cards

### Primary Test Card
- **Card Number**: `4929421234600821`
- **Expiry**: `12/25`
- **CVV**: `356`
- **Address**: Flat 6 Primrose Rise 347 Lavender Road, Northampton, GB NN17 8YG

### 3DS Test Cards
- **Method + Challenge**: `4000000000000002` (Full 3DS flow)
- **Method Only**: `4000000000000001` (3DS method without challenge)
- **Challenge Only**: `4000000000000003` (Direct 3DS challenge)

### Declined Cards
- **Generic Decline**: `4000000000000000`
- **Insufficient Funds**: `4000000000009995`
- **Expired Card**: `4000000000000069` (expiry: 12/20)

## 🧪 Testing Scenarios

### 1. Basic Payment Flow
1. Add items to cart
2. Go to checkout
3. Fill in customer details
4. Use Primary Test Card: `4929421234600821`
5. Complete payment

**Expected Result**: Payment should process successfully without 3DS

### 2. 3DS Method + Challenge Flow
1. Use 3DS test card: `4000000000000002`
2. Submit payment
3. 3DS iframe should appear
4. Complete 3DS authentication
5. Payment should complete

**Expected Result**: Full 3DS authentication flow with method and challenge

### 3. 3DS Method Only Flow
1. Use 3DS test card: `4000000000000001`
2. Submit payment
3. 3DS method should complete automatically
4. Payment should complete

**Expected Result**: 3DS method without challenge

### 4. Error Handling
1. Use declined card: `4000000000000000`
2. Submit payment
3. Error should be displayed

**Expected Result**: Proper error handling and user feedback

## 🔍 Monitoring & Debugging

### Browser Console
Monitor these logs during testing:
- `Payment transaction started`
- `3DS authentication required`
- `3DS continuation response`
- `Payment success/error`

### API Server Logs
Check the API server console for:
- Request/response data
- Signature verification
- Error details

### Network Tab
Monitor these requests:
- `POST /api/payment/process` - Initial payment
- `POST /payment-callback` - 3DS callback
- `POST /api/payment/process` - 3DS continuation

## 🛠️ Troubleshooting

### Common Issues

#### 1. CORS Error
**Problem**: `Access to fetch at 'https://qa-transactions.pixxlesportal.com/direct' has been blocked by CORS policy`

**Solution**: ✅ Fixed - All requests now route through API server

#### 2. 3DS Authentication "Insufficient Results"
**Problem**: `Payment failed: 3D Secure authentication results insufficient`

**Solution**: ✅ Fixed - Added required `action` and `type` fields to 3DS continuation

#### 3. 404 Payment Callback
**Problem**: `Failed to load resource: the server responded with a status of 404 (Not Found)`

**Solution**: ✅ Fixed - Created proper API route for payment callbacks

#### 4. Invalid threeDSRef
**Problem**: `Invalid threeDSRef` error

**Solution**: This is expected for test threeDSRef values. Use real 3DS flow to get valid refs.

### Debug Steps

1. **Check API Server Status**:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Test Payment Callback**:
   ```bash
   curl -X POST http://localhost:3000/payment-callback \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "threeDSAcsResponse=test"
   ```

3. **Verify CORS Headers**:
   Check that API responses include proper CORS headers

## 📊 Expected Response Codes

### Success Codes
- `0` - Transaction successful
- `65802` - 3DS authentication required

### Error Codes
- `65803` - 3DS declined
- `66848` - Invalid threeDSRef
- `1` - Transaction declined
- `2` - Transaction failed

## 🔒 Security Notes

- ✅ All sensitive operations moved to backend
- ✅ Signature generation only on server-side
- ✅ Rate limiting implemented
- ✅ Input validation enhanced
- ✅ CORS properly configured

## 🚀 Production Checklist

Before going live:

1. **Environment Variables**:
   - Set `PIXXLES_ENVIRONMENT=production`
   - Update `PIXXLES_GATEWAY_URL` to production URL
   - Configure production merchant credentials

2. **SSL Certificate**:
   - Ensure HTTPS is enabled
   - Update callback URLs to use HTTPS

3. **Monitoring**:
   - Set up payment analytics
   - Configure error logging
   - Monitor success/failure rates

4. **Testing**:
   - Test with real cards (small amounts)
   - Verify 3DS flow in production
   - Test error scenarios

---

**Status**: ✅ Ready for comprehensive testing
**Last Updated**: July 30, 2025 