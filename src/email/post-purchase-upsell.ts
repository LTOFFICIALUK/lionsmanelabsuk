import { orderService, DatabaseOrder } from '../utils/supabase';

interface OrderUpsellData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  topProduct: string;
  orderTotal: number;
}

interface BrevoEventData {
  event_name: string;
  properties: {
    email: string;
    FIRSTNAME: string;
    LASTNAME: string;
  };
  event_data: {
    id: string;
    data: {
      orderNumber: string;
      customerName: string;
      topProduct: string;
      orderTotal: number;
      currency: string;
      action: string;
    };
  };
}

// Parse order items to get the top product
const getTopProduct = (items: any): string => {
  if (!items || items.length === 0) return 'Blue Lotus Tea';
  
  try {
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    if (parsedItems.length === 0) return 'Blue Lotus Tea';
    
    // Get the first item as the top product
    const topItem = parsedItems[0];
    return topItem.productTitle || topItem.name || 'Blue Lotus Tea';
  } catch (error) {
    console.error('Error parsing order items:', error);
    return 'Blue Lotus Tea';
  }
};

// Extract customer name from order
const getCustomerName = (order: DatabaseOrder): string => {
  return `${order.customer_first_name} ${order.customer_last_name}`.trim();
};

// Prepare order data for upsell email
const prepareOrderUpsellData = (order: DatabaseOrder): OrderUpsellData => {
  const items = order.items;
  const topProduct = getTopProduct(items);
  
  return {
    orderNumber: order.order_number,
    customerName: getCustomerName(order),
    customerEmail: order.customer_email,
    topProduct: topProduct,
    orderTotal: order.total
  };
};

// Create Brevo event data for tracking
const createBrevoEventData = (orderData: OrderUpsellData): BrevoEventData => {
  const [firstName, ...lastNameParts] = orderData.customerName.split(' ');
  const lastName = lastNameParts.join(' ') || '';
  
  return {
    event_name: "order_shipped",
    properties: {
      email: orderData.customerEmail,
      FIRSTNAME: firstName,
      LASTNAME: lastName
    },
    event_data: {
      id: `order:${orderData.orderNumber}`,
      data: {
        orderNumber: orderData.orderNumber,
        customerName: orderData.customerName,
        topProduct: orderData.topProduct,
        orderTotal: orderData.orderTotal,
        currency: "GBP",
        action: "post_purchase_upsell_triggered"
      }
    }
  };
};

// Send post-purchase upsell email for a single order
const sendPostPurchaseUpsellEmail = async (orderData: OrderUpsellData): Promise<boolean> => {
  try {
    // Create Brevo event data
    const brevoEventData = createBrevoEventData(orderData);
    
    // Send the event to Brevo for tracking
    if (typeof window !== 'undefined' && (window as any).Brevo) {
      (window as any).Brevo.push([
        "track",
        brevoEventData.event_name,
        brevoEventData.properties,
        brevoEventData.event_data
      ]);
    }
    
    // You can also send the event via API if needed
    // This would be useful for server-side tracking
    console.log('Post-purchase upsell event triggered for:', orderData.orderNumber);
    console.log('Event data:', brevoEventData);
    
    return true;
  } catch (error) {
    console.error('Error sending post-purchase upsell email:', error);
    return false;
  }
};

// Main function to handle multiple orders
export const triggerPostPurchaseUpsellEmails = async (selectedOrderIds: string[]): Promise<{
  success: boolean;
  processed: number;
  failed: number;
  results: Array<{
    orderNumber: string;
    customerEmail: string;
    success: boolean;
    error?: string;
  }>;
}> => {
  try {
    console.log(`Triggering post-purchase upsell emails for ${selectedOrderIds.length} orders`);
    
    const results: Array<{
      orderNumber: string;
      customerEmail: string;
      success: boolean;
      error?: string;
    }> = [];
    
    let processed = 0;
    let failed = 0;
    
    // Process each selected order
    for (const orderId of selectedOrderIds) {
      try {
        // Get order details from database
        const { data: order, error } = await orderService.getOrderById(orderId);
        
        if (error || !order) {
          console.error(`Failed to get order ${orderId}:`, error);
          results.push({
            orderNumber: orderId,
            customerEmail: '',
            success: false,
            error: 'Order not found'
          });
          failed++;
          continue;
        }
        
        // Prepare order data for upsell email
        const orderData = prepareOrderUpsellData(order);
        
        // Send post-purchase upsell email
        const success = await sendPostPurchaseUpsellEmail(orderData);
        
        if (success) {
          results.push({
            orderNumber: orderData.orderNumber,
            customerEmail: orderData.customerEmail,
            success: true
          });
          processed++;
        } else {
          results.push({
            orderNumber: orderData.orderNumber,
            customerEmail: orderData.customerEmail,
            success: false,
            error: 'Failed to send email'
          });
          failed++;
        }
        
      } catch (error) {
        console.error(`Error processing order ${orderId}:`, error);
        results.push({
          orderNumber: orderId,
          customerEmail: '',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        failed++;
      }
    }
    
    console.log(`Post-purchase upsell emails completed: ${processed} successful, ${failed} failed`);
    
    return {
      success: failed === 0,
      processed,
      failed,
      results
    };
    
  } catch (error) {
    console.error('Error in triggerPostPurchaseUpsellEmails:', error);
    return {
      success: false,
      processed: 0,
      failed: selectedOrderIds.length,
      results: []
    };
  }
};

// Export individual functions for testing
export {
  prepareOrderUpsellData,
  createBrevoEventData,
  sendPostPurchaseUpsellEmail,
  getTopProduct,
  getCustomerName
}; 