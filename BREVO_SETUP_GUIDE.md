# Brevo Automation Setup Guide

## ✅ **What's Already Implemented**

### **1. Brevo Tracker Installed**
- ✅ Added to `index.html` with your client key: `e5dbzwvtfs38gkrimcsb614y`
- ✅ User identification on checkout
- ✅ Custom event tracking for `order_shipped`

### **2. Custom Event System**
- ✅ `order_shipped` event triggers when you click "Print Packing Slips"
- ✅ Sends customer data: name, email, top product, order total
- ✅ Handles multiple orders simultaneously

### **3. Test Functions Available**
- ✅ `testBrevoTracker()` - Test basic tracker functionality
- ✅ `testOrderShippedEvent()` - Test the specific event
- ✅ `runBrevoTests()` - Run all tests

## **Step 1: Verify Tracker Installation**

1. **Open your website** in a browser
2. **Open browser console** (F12)
3. **Run the test**: `runBrevoTests()`
4. **Check for success messages**:
   ```
   ✅ Brevo tracker is loaded
   ✅ User identification test sent
   ✅ Custom event test sent
   ✅ order_shipped event test sent
   ```

## **Step 2: Create Brevo Automation**

### **A. Log into Brevo**
1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **Automation** → **Workflows**

### **B. Create New Workflow**
1. **Click "Create a new workflow"**
2. **Choose "Custom event"** as trigger
3. **Set event name**: `order_shipped`

### **C. Configure Workflow Steps**

#### **Step 1: Wait (14 days)**
- **Action**: Wait
- **Duration**: 14 days
- **Description**: "Wait 2 weeks after order shipped"

#### **Step 2: Send Email**
- **Action**: Send email
- **Template**: Create new template
- **Subject**: "How's your Blue Lotus Tea experience? 🌸"

### **D. Email Template Content**

```html
Subject: How's your Blue Lotus Tea experience? 🌸

Hi {{contact.FIRSTNAME}},

We hope you're enjoying your {{event_data.topProduct}}! 

It's been 2 weeks since your order ({{event_data.orderNumber}}) was shipped, and we wanted to check in.

**How's it going?** We'd love to hear about your experience with our Blue Lotus products.

**Ready for more?** Here are some complementary products you might love:

🌸 **Blue Lotus Extract** - For enhanced effects
🌸 **Blue Lotus Smoking Blend** - For relaxation  
🌸 **Blue Lotus Tea Bags** - For convenience

[Shop Now] [Leave Review] [Contact Support]

Best regards,
The Blue Dream Tea Team
```

## **Step 3: Test the Complete Flow**

### **A. Test with Real Orders**
1. **Go to your admin panel** (`/admin`)
2. **Select some orders** (tick the checkboxes)
3. **Click "Print Packing Slips"**
4. **Check console** for success messages:
   ```
   Triggering post-purchase upsell emails for selected orders...
   ✅ Order BDT-123456789: Email sent to customer@email.com
   ```

### **B. Check Brevo Dashboard**
1. **Go to Brevo** → **Automation** → **Workflows**
2. **Find your workflow** and click on it
3. **Check "Activity" tab** for triggered events
4. **Look for `order_shipped` events** in the logs

### **C. Test Email Delivery**
1. **Wait 14 days** (or temporarily reduce wait time to 1 hour for testing)
2. **Check customer email** for the upsell email
3. **Monitor open rates** and click-through rates

## **Step 4: Advanced Configuration**

### **A. Add Conditions**
- **Filter by order value**: Only send to orders > £50
- **Filter by product**: Only send to specific product buyers
- **Filter by customer type**: New vs returning customers

### **B. Add Multiple Touchpoints**
1. **Email** (14 days)
2. **SMS** (21 days) - "How's your Blue Lotus Tea? Reply STOP to unsubscribe"
3. **Push notification** (28 days) - "Missing your Blue Lotus? Shop now!"

### **C. A/B Testing**
- **Test different subject lines**
- **Test different timing** (10 days vs 14 days vs 21 days)
- **Test different content** (product-focused vs experience-focused)

## **Step 5: Monitor and Optimize**

### **A. Key Metrics to Track**
- **Event trigger rate**: How many `order_shipped` events fire
- **Email open rate**: How many customers open the email
- **Click-through rate**: How many click on links
- **Conversion rate**: How many make additional purchases
- **Revenue per email**: Total revenue from upsell emails

### **B. Optimization Tips**
1. **Personalize content** based on purchased products
2. **Segment customers** by order value and frequency
3. **Test different offers** (discounts vs new products vs bundles)
4. **Optimize timing** based on customer behavior

## **Troubleshooting**

### **Issue: Events not triggering**
- **Check**: Console for `order_shipped` events
- **Verify**: Brevo tracker is loaded (`testBrevoTracker()`)
- **Confirm**: User identification is working

### **Issue: Emails not sending**
- **Check**: Brevo workflow is active
- **Verify**: Event name matches exactly (`order_shipped`)
- **Confirm**: Wait time is set correctly

### **Issue: Data not appearing**
- **Check**: Event data structure in console
- **Verify**: Customer identification is working
- **Confirm**: Brevo dashboard for event logs

## **Next Steps**

1. **✅ Set up the automation workflow** in Brevo
2. **✅ Test with real orders** from your admin panel
3. **✅ Monitor performance** and optimize
4. **✅ Scale to other events** (cart abandonment, product views, etc.)

Your post-purchase upsell automation is now ready to drive additional revenue! 🎉 