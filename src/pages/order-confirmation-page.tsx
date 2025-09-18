import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import { orderService } from '../utils/supabase';
import { retrieveCheckoutSession } from '../utils/stripe';
import type { DatabaseOrder } from '../utils/supabase';

const OrderConfirmationPage: React.FC = () => {
  console.log('OrderConfirmationPage component mounted');
  
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');
  const sessionId = searchParams.get('session_id');
  console.log('Order number from URL:', orderNumber);
  console.log('Session ID from URL:', sessionId);
  
  const [order, setOrder] = useState<DatabaseOrder | null>(null);
  const [stripeSession, setStripeSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // If we have a Stripe session ID, retrieve the session first
        if (sessionId) {
          console.log('Retrieving Stripe session:', sessionId);
          const session = await retrieveCheckoutSession(sessionId);
          setStripeSession(session);
          console.log('Stripe session retrieved:', session);
          
          // Try to find order by payment intent ID or customer email
          if (session.payment_intent) {
            const { data: orderByPayment } = await orderService.getOrderByPaymentIntent(session.payment_intent.id);
            if (orderByPayment) {
              setOrder(orderByPayment);
              setLoading(false);
              return;
            }
          }
          
          // If no order found by payment intent, try by customer email
          if (session.customer_details?.email) {
            const { data: orderByEmail } = await orderService.getOrderByEmail(session.customer_details.email);
            if (orderByEmail) {
              setOrder(orderByEmail);
              setLoading(false);
              return;
            }
          }
        }
        
        // Fallback to order number if provided
        if (orderNumber) {
          console.log('Fetching order details for:', orderNumber);
          const { data, error } = await orderService.getOrderByNumber(orderNumber);
          console.log('Order data received:', data);
          console.log('Order error:', error);
          
          if (error) throw error;
          if (!data) throw new Error('Order not found');
          setOrder(data);
        } else if (!sessionId) {
          throw new Error('No order number or session ID provided');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderNumber, sessionId]);

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

  const orderItems = order ? JSON.parse(order.items) : [];

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
            {order ? `Order #${order.order_number}` : 'Payment Successful'}
          </p>
          {stripeSession && (
            <p className="text-sm text-gray-500 mt-2">
              Payment ID: {stripeSession.payment_intent?.id || 'N/A'}
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-4">
                  {orderItems.length > 0 ? (
                    orderItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.productTitle}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : stripeSession?.line_items?.data ? (
                    stripeSession.line_items.data.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.description}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">
                          £{(item.amount_total / 100).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items found</p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                <div className="text-gray-600">
                  {order ? (
                    <>
                      <p>{order.customer_first_name} {order.customer_last_name}</p>
                      <p>{order.shipping_address_line1}</p>
                      {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
                      <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                      <p>{order.shipping_country}</p>
                    </>
                  ) : stripeSession?.shipping_details ? (
                    <>
                      <p>{stripeSession.shipping_details.name}</p>
                      <p>{stripeSession.shipping_details.address.line1}</p>
                      {stripeSession.shipping_details.address.line2 && <p>{stripeSession.shipping_details.address.line2}</p>}
                      <p>{stripeSession.shipping_details.address.city}, {stripeSession.shipping_details.address.postal_code}</p>
                      <p>{stripeSession.shipping_details.address.country}</p>
                    </>
                  ) : (
                    <p>Address information not available</p>
                  )}
                </div>
              </div>

              {/* Shipping Method */}
              {order && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Shipping Method</h3>
                  <p className="text-gray-600">{order.shipping_method}</p>
                </div>
              )}

              {/* Order Summary */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {order ? (
                    <>
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
                    </>
                  ) : stripeSession ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">£{(stripeSession.amount_subtotal / 100).toFixed(2)}</span>
                      </div>
                      {stripeSession.total_details?.amount_tax > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span className="text-gray-900">£{(stripeSession.total_details.amount_tax / 100).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span>£{(stripeSession.amount_total / 100).toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">Order summary not available</p>
                  )}
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