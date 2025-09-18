# Stripe Checkout Integration

This document outlines the Stripe Checkout integration implemented for the Blue Dream Tea UK e-commerce site.

## Overview

The integration uses Stripe's prebuilt checkout forms to provide a secure, PCI-compliant payment experience. Customers are redirected to Stripe's hosted checkout page where they can complete their payment securely.

## Features Implemented

### 1. Stripe Checkout Session Creation
- **File**: `src/utils/stripe.ts`
- Creates checkout sessions with line items, customer information, and shipping details
- Handles discounts and shipping costs
- Supports international shipping

### 2. Checkout Page Integration
- **File**: `src/pages/checkout.tsx`
- Collects customer and shipping information
- Validates form data
- Redirects to Stripe Checkout on form submission
- Removed the old payment step - now goes directly to Stripe

### 3. API Endpoints
- **File**: `api/create-checkout-session.js` - Creates Stripe checkout sessions
- **File**: `api/retrieve-checkout-session.js` - Retrieves session details
- **File**: `api/stripe-webhook.js` - Handles Stripe webhooks for payment processing

### 4. Order Confirmation
- **File**: `src/pages/order-confirmation-page.tsx`
- Handles both order number and Stripe session ID parameters
- Displays order details from either database or Stripe session
- Shows payment confirmation information

### 5. Webhook Processing
- Processes `checkout.session.completed` events
- Creates orders in the database automatically
- Handles payment success notifications

## Environment Variables Required

Add these to your `.env` file:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Setup Instructions

### 1. Stripe Account Setup
1. Create a Stripe account at https://stripe.com
2. Get your publishable and secret keys from the Stripe Dashboard
3. Set up webhook endpoints in your Stripe Dashboard

### 2. Webhook Configuration
1. In your Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook secret to your environment variables

### 3. Environment Configuration
1. Copy `env.example` to `.env`
2. Add your Stripe keys and webhook secret
3. Ensure your Supabase configuration is also set up

## Payment Flow

1. **Customer fills checkout form** - Collects shipping and contact information
2. **Form validation** - Ensures all required fields are completed
3. **Stripe session creation** - Creates checkout session with line items and customer data
4. **Redirect to Stripe** - Customer is redirected to Stripe's secure checkout page
5. **Payment processing** - Stripe handles payment collection and processing
6. **Webhook notification** - Stripe sends webhook to create order in database
7. **Order confirmation** - Customer is redirected to confirmation page

## Security Features

- **PCI Compliance** - Stripe handles all sensitive payment data
- **Webhook verification** - All webhooks are verified using Stripe signatures
- **HTTPS required** - All API endpoints require secure connections
- **Environment variables** - Sensitive keys are stored securely

## Testing

### Test Cards
Use Stripe's test card numbers for testing:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### Test Mode
- Use test keys (pk_test_ and sk_test_) for development
- Switch to live keys (pk_live_ and sk_live_) for production

## Error Handling

The integration includes comprehensive error handling:
- Form validation errors
- Stripe API errors
- Webhook processing errors
- Database connection errors
- Network timeout handling

## International Support

- Supports multiple currencies (configured for GBP)
- International shipping address collection
- Country-specific payment methods
- Tax calculation (when enabled in Stripe)

## Next Steps

1. **Set up Stripe account** and get API keys
2. **Configure webhooks** in Stripe Dashboard
3. **Test the integration** using test cards
4. **Deploy to production** with live keys
5. **Monitor webhook delivery** in Stripe Dashboard

## Support

For issues with the Stripe integration:
1. Check Stripe Dashboard for webhook delivery status
2. Review browser console for client-side errors
3. Check server logs for API endpoint errors
4. Verify environment variables are correctly set
