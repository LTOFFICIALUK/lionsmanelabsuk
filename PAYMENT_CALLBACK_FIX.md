# 🔧 Payment Callback 404 Fix

## Problem
Getting a 404 error when 3DS authentication tries to POST to `/payment-callback`:
```
Failed to load resource: the server responded with a status of 404 (Not Found)
Request URL: http://localhost:5174/payment-callback?threeDSAcsResponse=method
```

## Root Cause
- React Router only handles GET requests by default
- 3DS providers send POST requests to the callback URL
- The POST request was going to the Vite dev server instead of the API server

## ✅ Solution

### 1. Run Both Servers Together
Instead of running just `npm run dev`, use:

```bash
npm run dev:full
```

This starts both:
- 📡 API Server on port 3000 (handles POST requests)
- ⚛️ Vite Dev Server on port 5174 (serves React app)

### 2. Alternative: Manual Setup
If you prefer to run them separately:

**Terminal 1: Start API Server**
```bash
npm run dev:api
```

**Terminal 2: Start Vite Dev Server**
```bash
npm run dev
```

### 3. Verify Setup
1. Check that both servers are running:
   - Frontend: http://localhost:5174
   - API: http://localhost:3000
   - Payment Callback: http://localhost:3000/payment-callback

2. Test the callback endpoint:
   ```bash
   curl -X POST http://localhost:3000/payment-callback \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "threeDSAcsResponse=test"
   ```

## 🔄 How It Works Now

1. **3DS Provider** sends POST to `/payment-callback`
2. **Vite Proxy** forwards POST requests to API server (port 3000)
3. **API Server** handles the POST request and returns HTML
4. **HTML Response** communicates with parent window via `postMessage`
5. **React Component** receives the 3DS response and continues payment

## 🧪 Testing 3DS Flow

1. Start development environment:
   ```bash
   npm run dev:full
   ```

2. Go to checkout page: http://localhost:5174/checkout

3. Use a 3DS test card:
   - **Card Number**: `4000000000000002`
   - **CVV**: `123`
   - **Expiry**: Any future date

4. Submit payment - should trigger 3DS challenge

5. Complete 3DS authentication in iframe

6. Verify payment completes successfully

## 🐛 Debugging

### Check Logs
The dev script shows colored logs:
- 🔵 `[API]` - API server logs
- 🟢 `[VITE]` - Vite dev server logs

### Common Issues

**Port 3000 Already in Use:**
```bash
# Kill existing process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Proxy Not Working:**
- Check Vite config has proxy settings
- Ensure API server is running first
- Check CORS headers in browser network tab

**3DS Iframe Not Loading:**
- Check browser console for errors
- Verify redirect URL is correct
- Check if ngrok is needed for external testing

### Network Debugging
```bash
# Check what's running on each port
lsof -i :3000  # API server
lsof -i :5174  # Vite dev server

# Test proxy forwarding
curl -X GET http://localhost:5174/api/health
```

## 🚀 Production Deployment

For production, the API routes are handled by Vercel automatically:
- `/api/payment-callback` - Vercel serverless function
- Frontend routes - Vercel static hosting

No additional configuration needed for production.

## 📝 Files Modified

1. ✅ `api/payment-callback.ts` - New serverless function
2. ✅ `vite.config.js` - Added proxy configuration  
3. ✅ `local-api-server.js` - Enhanced callback handling
4. ✅ `dev-server.js` - Combined development script

## 🎯 Quick Test

```bash
# 1. Start development environment
npm run dev:full

# 2. Test API health
curl http://localhost:3000/api/health

# 3. Test payment callback
curl -X POST http://localhost:3000/payment-callback \
  -d "threeDSAcsResponse=test"

# 4. Access frontend
open http://localhost:5174
```

## ✅ Success Indicators

- ✅ Both servers start without errors
- ✅ Frontend loads at http://localhost:5174
- ✅ API responds at http://localhost:3000
- ✅ Payment callback returns HTML (not 404)
- ✅ 3DS iframe loads and communicates properly
- ✅ Payment flow completes successfully

---

**🎉 That's it! Your payment callback should now work correctly with 3DS authentication.** 