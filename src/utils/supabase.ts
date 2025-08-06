import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// For now, using placeholder values - you'll need to replace these with your actual Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl !== 'https://your-project.supabase.co' && 
                             supabaseAnonKey !== 'your-anon-key' && 
                             !supabaseUrl.includes('your-project');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for orders
export interface DatabaseOrder {
  id: string;
  order_number: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string;
  shipping_address_line1: string;
  shipping_address_line2?: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  billing_email: string;
  items: string; // JSON string of cart items
  subtotal: number;
  discount_amount: number;
  discount_code?: string;
  shipping_cost: number;
  shipping_method: string; // Add this line
  total: number;
  status: string;
  tracking_number?: string;
  estimated_delivery?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailOrderDetails {
    orderNumber: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        postcode: string;
        country: string;
    };
}

// Order management functions
// Helper function to save order to localStorage
const saveOrderToLocalStorage = async (orderData: Omit<DatabaseOrder, 'id' | 'created_at' | 'updated_at'>) => {
    try {
        console.log('Saving order to localStorage');
        const orderId = uuidv4();
        const now = new Date().toISOString();
        
        const order = {
            id: orderId,
            ...orderData,
            created_at: now,
            updated_at: now
        };
        
        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('blueDreamTea_orders', JSON.stringify(existingOrders));
        
        console.log('Order saved to localStorage:', order);
        return { data: order, error: null };
    } catch (error) {
        console.error('Error saving order to localStorage:', error);
        return { data: null, error: error as any };
    }
};

export const orderService = {
    createOrder: async (orderData: Omit<DatabaseOrder, 'id' | 'created_at' | 'updated_at'>) => {
        if (!isSupabaseConfigured) {
            // Fallback to localStorage for development
            return await saveOrderToLocalStorage(orderData);
        }
        
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([{
                    id: uuidv4(), // Generate a unique ID
                    ...orderData,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error creating order:', error);
                // If it's a database schema error (400), fall back to localStorage
                if (error.code === '400' || error.message?.includes('column') || error.message?.includes('schema')) {
                    console.log('Database schema error detected, falling back to localStorage');
                    return await saveOrderToLocalStorage(orderData);
                }
                return { data: null, error };
            }

            return { data, error: null };
        } catch (error) {
            console.error('Error in createOrder:', error);
            // If it's a network error or other issue, fall back to localStorage
            console.log('Network error detected, falling back to localStorage');
            return await saveOrderToLocalStorage(orderData);
        }
    },

  // Get all orders
  async getAllOrders(): Promise<{ data: DatabaseOrder[] | null; error: any }> {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage orders for demo purposes
      try {
        const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
        const convertedOrders = localOrders.map((order: any) => ({
          id: order.id,
          order_number: order.orderNumber,
          customer_email: order.billingAddress?.email || order.shippingAddress?.email,
          customer_first_name: order.shippingAddress?.firstName || '',
          customer_last_name: order.shippingAddress?.lastName || '',
          customer_phone: order.shippingAddress?.phone || '',
          shipping_address_line1: order.shippingAddress?.addressLine1 || '',
          shipping_address_line2: order.shippingAddress?.addressLine2 || '',
          shipping_city: order.shippingAddress?.city || '',
          shipping_postal_code: order.shippingAddress?.postalCode || '',
          shipping_country: order.shippingAddress?.country || 'United Kingdom',
          billing_email: order.billingAddress?.email || '',
          items: order.items,
          subtotal: order.subtotal,
          discount_amount: order.discountAmount || 0,
          discount_code: order.discountCode || '',
          shipping_cost: order.shippingCost,
          total: order.total,
          status: order.status,
          tracking_number: order.trackingNumber || '',
          estimated_delivery: order.estimatedDelivery || '',
          notes: order.notes || '',
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        }));
        return { data: convertedOrders, error: null };
      } catch (err) {
        return { data: [], error: null };
      }
    }
    return await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Get order by ID
  async getOrderById(id: string): Promise<{ data: DatabaseOrder | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }
    return await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Update order
  async updateOrder(id: string, updates: Partial<DatabaseOrder>): Promise<{ data: DatabaseOrder | null; error: any }> {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage for demo
      try {
        const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
        const orderIndex = localOrders.findIndex((order: any) => order.id === id);
        
        if (orderIndex >= 0) {
          // Update the local order - convert from database format back to app format
          const order = localOrders[orderIndex];
          if (updates.customer_first_name) order.shippingAddress.firstName = updates.customer_first_name;
          if (updates.customer_last_name) order.shippingAddress.lastName = updates.customer_last_name;
          if (updates.customer_email) {
            order.billingAddress.email = updates.customer_email;
            order.shippingAddress.email = updates.customer_email;
          }
          if (updates.customer_phone) order.shippingAddress.phone = updates.customer_phone;
          if (updates.shipping_address_line1) order.shippingAddress.addressLine1 = updates.shipping_address_line1;
          if (updates.shipping_address_line2) order.shippingAddress.addressLine2 = updates.shipping_address_line2;
          if (updates.shipping_city) order.shippingAddress.city = updates.shipping_city;
          if (updates.shipping_postal_code) order.shippingAddress.postalCode = updates.shipping_postal_code;
          if (updates.shipping_country) order.shippingAddress.country = updates.shipping_country;
          if (updates.status) order.status = updates.status;
          if (updates.discount_code) order.discountCode = updates.discount_code;
          if (updates.discount_amount !== undefined) order.discountAmount = updates.discount_amount;
          if (updates.notes) order.notes = updates.notes;
          if (updates.tracking_number) order.trackingNumber = updates.tracking_number;
          order.updatedAt = new Date().toISOString();
          
          localStorage.setItem('blueDreamTea_orders', JSON.stringify(localOrders));
          
          // Convert back to database format for response
          const dbOrder = {
            id: order.id,
            order_number: order.orderNumber,
            customer_email: order.billingAddress?.email || '',
            customer_first_name: order.shippingAddress?.firstName || '',
            customer_last_name: order.shippingAddress?.lastName || '',
            customer_phone: order.shippingAddress?.phone || '',
            shipping_address_line1: order.shippingAddress?.addressLine1 || '',
            shipping_address_line2: order.shippingAddress?.addressLine2 || '',
            shipping_city: order.shippingAddress?.city || '',
            shipping_postal_code: order.shippingAddress?.postalCode || '',
            shipping_country: order.shippingAddress?.country || 'United Kingdom',
            billing_email: order.billingAddress?.email || '',
            items: order.items,
            subtotal: order.subtotal,
            discount_amount: order.discountAmount || 0,
            discount_code: order.discountCode || '',
            shipping_cost: order.shippingCost,
            total: order.total,
            status: order.status,
            tracking_number: order.trackingNumber || '',
            estimated_delivery: order.estimatedDelivery || '',
            notes: order.notes || '',
            created_at: order.createdAt,
            updated_at: order.updatedAt,
          };
          
          return { data: dbOrder as DatabaseOrder, error: null };
        }
        
        return { data: null, error: { message: 'Order not found' } };
      } catch (err) {
        return { data: null, error: { message: 'Failed to update order' } };
      }
    }
    return await supabase
      .from('orders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },

  // Delete order
  async deleteOrder(id: string): Promise<{ error: any }> {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage for demo
      try {
        const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
        const filteredOrders = localOrders.filter((order: any) => order.id !== id);
        localStorage.setItem('blueDreamTea_orders', JSON.stringify(filteredOrders));
        return { error: null };
      } catch (err) {
        return { error: { message: 'Failed to delete order' } };
      }
    }
    return await supabase
      .from('orders')
      .delete()
      .eq('id', id);
  },

  getOrderByNumber: async (orderNumber: string) => {
        if (!isSupabaseConfigured) {
            // Fallback to localStorage for development
            try {
                console.log('Development mode: Searching for order in localStorage');
                const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
                const order = localOrders.find((order: any) => order.order_number === orderNumber);
                
                if (order) {
                    console.log('Order found in localStorage:', order);
                    return { data: order, error: null };
                } else {
                    console.log('Order not found in localStorage');
                    return { data: null, error: { message: 'Order not found' } };
                }
            } catch (error) {
                console.error('Error searching localStorage:', error);
                return { data: null, error: error as any };
            }
        }
        
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('order_number', orderNumber)
                .single();

            if (error) {
                console.error('Error fetching order from Supabase:', error);
                // If Supabase fails, try localStorage as fallback
                try {
                    console.log('Trying localStorage fallback');
                    const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
                    const order = localOrders.find((order: any) => order.order_number === orderNumber);
                    
                    if (order) {
                        console.log('Order found in localStorage fallback:', order);
                        return { data: order, error: null };
                    }
                } catch (localError) {
                    console.error('localStorage fallback failed:', localError);
                }
                return { data: null, error };
            }

            return { data, error: null };
        } catch (error) {
            console.error('Error in getOrderByNumber:', error);
            // Try localStorage as final fallback
            try {
                console.log('Trying localStorage as final fallback');
                const localOrders = JSON.parse(localStorage.getItem('blueDreamTea_orders') || '[]');
                const order = localOrders.find((order: any) => order.order_number === orderNumber);
                
                if (order) {
                    console.log('Order found in localStorage final fallback:', order);
                    return { data: order, error: null };
                }
            } catch (localError) {
                console.error('localStorage final fallback failed:', localError);
            }
            return { data: null, error: error as any };
        }
    },

  sendOrderConfirmationEmail: async (email: string, orderDetails: EmailOrderDetails) => {
        try {
            const { data, error } = await supabase.functions.invoke('send-order-email', {
                body: {
                    to: email,
                    orderDetails
                }
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
            throw error;
        }
    }
}; 