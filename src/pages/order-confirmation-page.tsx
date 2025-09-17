import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import { orderService } from '../utils/supabase';
import type { DatabaseOrder } from '../utils/supabase';

const OrderConfirmationPage: React.FC = () => {
  console.log('OrderConfirmationPage component mounted');
  
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');
  console.log('Order number from URL:', orderNumber);
  
  const [order, setOrder] = useState<DatabaseOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      console.log('Fetching order details for:', orderNumber);
      
      if (!orderNumber) {
        console.log('No order number provided');
        setError('No order number provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await orderService.getOrderByNumber(orderNumber);
        console.log('Order data received:', data);
        console.log('Order error:', error);
        
        if (error) throw error;
        if (!data) throw new Error('Order not found');
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to load order details'}</p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <HiArrowLeft className="mr-2" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const orderItems = JSON.parse(order.items);

  return (
    <>
      <Helmet>
        <title>Order Confirmation - Lion\'s Mane Labs UK</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <HiCheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-gray-600">
            Order #{order.order_number}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-4">
                  {orderItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{item.productTitle}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                <div className="text-gray-600">
                  <p>{order.customer_first_name} {order.customer_last_name}</p>
                  <p>{order.shipping_address_line1}</p>
                  {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
                  <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                  <p>{order.shipping_country}</p>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Shipping Method</h3>
                <p className="text-gray-600">{order.shipping_method}</p>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">£{order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount{order.discount_code ? ` (${order.discount_code})` : ''}:</span>
                      <span>-£{order.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">£{order.shipping_cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>£{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We'll send you a confirmation email with your order details and tracking information once your order ships.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <HiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage; 