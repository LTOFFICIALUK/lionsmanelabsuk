# 🔧 3DS Testing Configuration

## Testing with Specific 3DS URL

You can now test your payment integration with a specific 3DS URL by configuring the `VITE_PIXXLES_3DS_URL` environment variable.

### Setup Instructions

1. **Add to your `.env` file:**
   ```bash
   VITE_PIXXLES_3DS_URL=https://acs.3ds-pit.com/
   ```

2. **Restart your development server:**
   ```bash
   npm run dev:full
   ```

### How It Works

- When `VITE_PIXXLES_3DS_URL` is set, it will override the `threeDSURL` returned by the Pixxles payment gateway
- This allows you to test with specific 3DS providers or test environments
- The URL will be used for both initial 3DS challenges and subsequent challenge rounds

### Testing Flow

1. **Start the development environment:**
   ```bash
   npm run dev:full
   ```

2. **Navigate to checkout:** http://localhost:5174/checkout

3. **Use a 3DS test card:**
   - **Card Number:** `4000000000000002`
   - **CVV:** `123`
   - **Expiry:** Any future date

4. **The 3DS challenge will now use:** `https://acs.3ds-pit.com/`

### Verification

Check the browser console for these log messages:
```
✅ Using 3DS URL: https://acs.3ds-pit.com/
🚀 Challenge URL: https://acs.3ds-pit.com/
```

### Removing the Override

To use the default 3DS URL from Pixxles:
1. Remove or comment out the `VITE_PIXXLES_3DS_URL` line from your `.env` file
2. Restart the development server

### Code Changes Made

1. **Updated `src/utils/pixxles-api.ts`:**
   - Added `threeDSURL` to `PixxlesConfig` interface
   - Added configuration from `VITE_PIXXLES_3DS_URL` environment variable

2. **Updated `src/components/PaymentForm.tsx`:**
   - Modified 3DS URL selection to use configured URL when available
   - Updated both initial challenge and subsequent challenge handling

3. **Updated `env.example`:**
   - Added documentation for the new 3DS URL configuration option

### Troubleshooting

If the 3DS URL override is not working:

1. **Check environment variable:**
   ```bash
   echo $VITE_PIXXLES_3DS_URL
   ```

2. **Verify in browser console:**
   - Look for the "Using 3DS URL" log message
   - Ensure it shows the correct URL

3. **Restart development server:**
   - Environment variables require a server restart to take effect

### Production Notes

- This configuration is for testing purposes only
- In production, always use the 3DS URL provided by the payment gateway
- Remove the `VITE_PIXXLES_3DS_URL` environment variable in production 