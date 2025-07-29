# Brevo Customer Creation Integration

## Overview

This integration automatically creates or updates customers in Brevo when they complete checkout. This ensures Brevo has complete customer profiles for email marketing, automation, and analytics.

## ✅ What's Implemented

### **1. Brevo API Service**
- ✅ Complete API service for customer management
- ✅ Customer creation/update functionality
- ✅ Event tracking capabilities
- ✅ Error handling and fallbacks

### **2. Checkout Integration**
- ✅ Automatic customer creation during checkout
- ✅ Order completion event tracking
- ✅ Product information capture
- ✅ Address and contact details sync

### **3. Test Functions**
- ✅ `testBrevoApiIntegration()` - Test API connectivity
- ✅ `testBrevoCustomerCreation()` - Test with checkout data
- ✅ Global test functions available in browser console

## Setup Instructions

### **Step 1: Get Your Brevo API Key**

1. **Log into Brevo Dashboard**
   - Go to [Brevo Dashboard](https://app.brevo.com/)
   - Navigate to **Settings** → **API Keys**

2. **Create API Key**
   - Click "Create API Key"
   - Give it a name like "Blue Dream Tea Customer API"
   - Select permissions: **Contacts** and **Events**
   - Copy the generated API key

### **Step 2: Configure Environment Variables**

Add these to your `.env` file:

```bash
# Brevo API Configuration
VITE_BREVO_API_KEY=your-brevo-api-key-here
VITE_BREVO_DEFAULT_LIST_ID=2
```

**Note**: The `VITE_BREVO_DEFAULT_LIST_ID` is optional. If set, new customers will be automatically added to this list.

### **Step 3: Test the Integration**

1. **Open your website** in a browser
2. **Open browser console** (F12)
3. **Run the tests**:
   ```javascript
   // Test basic API connectivity
   testBrevoApiIntegration()
   
   // Test customer creation with checkout data
   testBrevoCustomerCreation()
   ```

4. **Check for success messages**:
   ```
   ✅ Brevo API is configured
   ✅ Test customer created/updated successfully: 12345
   ✅ Test event tracked successfully
   ✅ Customer information retrieved
   ```

### **Step 4: Test Real Checkout**

1. **Complete a test order** through your checkout
2. **Check browser console** for Brevo logs:
   ```
   Creating/updating customer in Brevo: {email: "test@example.com", firstName: "John", lastName: "Doe"}
   ✅ Customer created/updated in Brevo: 12345
   ✅ Event 'order_completed' tracked in Brevo for test@example.com
   ```

3. **Verify in Brevo Dashboard**:
   - Go to **Contacts** → **All Contacts**
   - Look for your test customer
   - Check their attributes and event history

## Customer Data Captured

### **Contact Information**
- Email address
- First and last name
- Phone number
- Company name

### **Address Information**
- Full address (line 1 + line 2)
- City
- Postal code
- Country

### **Order Information**
- Order number
- Order total
- Products purchased
- Shipping method

### **Customer Attributes**
- Customer since date
- Last order date
- Last order total
- Preferred products
- Total orders (updated on subsequent orders)

## Event Tracking

### **Order Completed Event**
Triggered when customer completes checkout:
```javascript
{
  eventName: 'order_completed',
  properties: {
    orderNumber: 'BDT-123456789',
    orderTotal: 79.97,
    products: ['Blue Lotus Flower Tea', 'Blue Lotus Extract'],
    shippingMethod: 'Standard Shipping'
  }
}
```

## Brevo Automation Opportunities

### **1. Welcome Series**
- **Trigger**: Customer created
- **Timing**: Immediate + 3 days + 7 days
- **Content**: Welcome, product usage tips, reviews

### **2. Order Follow-up**
- **Trigger**: Order completed
- **Timing**: 2 days + 14 days + 30 days
- **Content**: Delivery tracking, usage tips, reorder reminders

### **3. Product Recommendations**
- **Trigger**: Order completed
- **Timing**: 7 days + 21 days
- **Content**: Related products, bundles, exclusive offers

### **4. Re-engagement**
- **Trigger**: No orders in 30 days
- **Timing**: 30 days + 60 days + 90 days
- **Content**: Special offers, new products, loyalty rewards

## Customer Segmentation

### **By Order Value**
- **High Value**: Orders > £50
- **Medium Value**: Orders £25-£50
- **Low Value**: Orders < £25

### **By Purchase Frequency**
- **New Customers**: First order
- **Returning Customers**: 2-5 orders
- **Loyal Customers**: 5+ orders

### **By Products**
- **Tea Buyers**: Purchased tea products
- **Extract Buyers**: Purchased extracts
- **Bundle Buyers**: Purchased multiple product types

## Error Handling

### **API Key Missing**
- Customer creation is skipped
- Checkout continues normally
- Warning logged to console

### **API Errors**
- Customer creation fails gracefully
- Checkout continues normally
- Error logged to console
- No impact on user experience

### **Network Issues**
- Automatic retry logic
- Fallback to client-side tracking
- Order still saved to database

## Monitoring and Analytics

### **Key Metrics to Track**
- Customer creation success rate
- Event tracking success rate
- API response times
- Error rates and types

### **Brevo Dashboard**
- **Contacts**: Monitor customer growth
- **Events**: Track order completion rates
- **Automation**: Monitor workflow performance
- **Analytics**: Customer behavior insights

## Troubleshooting

### **Issue: Customers not appearing in Brevo**
- **Check**: API key is correct and has proper permissions
- **Verify**: Environment variables are loaded
- **Test**: Run `testBrevoApiIntegration()` in console

### **Issue: Events not tracking**
- **Check**: API key has event permissions
- **Verify**: Event names match automation triggers
- **Test**: Run `testBrevoCustomerCreation()` in console

### **Issue: API errors in console**
- **Check**: Network connectivity
- **Verify**: API key is valid and not expired
- **Test**: API key in Brevo dashboard

### **Issue: Checkout failing**
- **Check**: Brevo errors are not breaking checkout
- **Verify**: Error handling is working
- **Test**: Complete test order without Brevo

## Next Steps

1. **✅ Set up API key** and test integration
2. **✅ Create welcome automation** in Brevo
3. **✅ Set up order follow-up** workflows
4. **✅ Configure customer segmentation**
5. **✅ Monitor performance** and optimize
6. **✅ Scale to other events** (cart abandonment, product views)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key in the Brevo dashboard
3. Test with the provided test functions
4. Check network connectivity and API status

Your Brevo customer creation integration is now ready to capture and nurture customers! 🎉 