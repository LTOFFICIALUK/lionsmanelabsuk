import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  HiCheckCircle, 
  HiClock, 
  HiTruck, 
  HiLocationMarker,
  HiExclamationCircle,
  HiInformationCircle
} from 'react-icons/hi';
import { orderService, DatabaseOrder } from '../utils/supabase';
import { Order } from '../types';

const OrderStatusPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  const [order, setOrder] = useState<DatabaseOrder | Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Status configuration
  const statusConfig = {
    pending: {
      icon: HiClock,
      color: 'text-yellow-600 bg-yellow-100',
      label: 'Order Received',
      description: 'Your order has been received and is being processed'
    },
    confirmed: {
      icon: HiCheckCircle,
      color: 'text-blue-600 bg-blue-100',
      label: 'Order Confirmed',
      description: 'Your order has been confirmed and will be prepared soon'
    },
    processing: {
      icon: HiInformationCircle,
      color: 'text-purple-600 bg-purple-100',
      label: 'Processing',
      description: 'Your order is being carefully prepared for shipment'
    },
    shipped: {
      icon: HiTruck,
      color: 'text-indigo-600 bg-indigo-100',
      label: 'Shipped',
      description: 'Your order is on its way to you'
    },
    delivered: {
      icon: HiLocationMarker,
      color: 'text-green-600 bg-green-100',
      label: 'Delivered',
      description: 'Your order has been successfully delivered'
    },
    cancelled: {
      icon: HiExclamationCircle,
      color: 'text-red-600 bg-red-100',
      label: 'Cancelled',
      description: 'This order has been cancelled'
    }
  };

  const getProgressPercentage = (status: string) => {
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const loadOrder = async () => {
    if (!orderNumber) {
      setError('No order number provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Try to get from Supabase first
      const { data: supabaseOrder, error: supabaseError } = await orderService.getAllOrders();
      
      if (supabaseOrder && !supabaseError) {
        const foundOrder = supabaseOrder.find(o => o.order_number === orderNumber);
        
        if (foundOrder) {
          setOrder(foundOrder);
          setLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      const localOrders = JSON.parse(localStorage.getItem('lionsManeLabs_orders') || '[]');
      const foundOrder = localOrders.find((o: Order) => o.orderNumber === orderNumber);

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check your order number.');
      }
    } catch (err) {
      setError('Failed to load order information');
      console.error('Error loading order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderNumber, email]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order information...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <>
        <Helmet>
          <title>Order Status - Lion\'s Mane Labs UK</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="max-w-2xl mx-auto py-16 text-center">
          <HiExclamationCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
                     <p className="text-gray-600 mb-8">
             {error || 'We couldn\'t find an order with that number.'}
           </p>
           <div className="space-y-4">
             <p className="text-sm text-gray-500">
               Please check your order number, or contact us if you need assistance.
             </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <a
                href="mailto:support@lionsmanelabs.co.uk"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Normalize order data (handle both database and localStorage formats)
  const orderData = {
    orderNumber: (order as DatabaseOrder).order_number || (order as Order).orderNumber,
    status: order.status,
    items: (order as DatabaseOrder).items ? 
      (Array.isArray((order as DatabaseOrder).items) ? (order as DatabaseOrder).items : JSON.parse((order as DatabaseOrder).items as string)) :
      (order as Order).items,
    total: order.total,
    trackingNumber: (order as DatabaseOrder).tracking_number || (order as Order).trackingNumber,
    createdAt: (order as DatabaseOrder).created_at || (order as Order).createdAt,
    customerName: (order as DatabaseOrder).customer_first_name ? 
      `${(order as DatabaseOrder).customer_first_name} ${(order as DatabaseOrder).customer_last_name}` :
      `${(order as Order).shippingAddress?.firstName} ${(order as Order).shippingAddress?.lastName}`,
    shippingAddress: (order as DatabaseOrder).shipping_address_line1 ? {
      addressLine1: (order as DatabaseOrder).shipping_address_line1,
      addressLine2: (order as DatabaseOrder).shipping_address_line2,
      city: (order as DatabaseOrder).shipping_city,
      postalCode: (order as DatabaseOrder).shipping_postal_code,
      country: (order as DatabaseOrder).shipping_country,
    } : (order as Order).shippingAddress,
    subtotal: order.subtotal,
    discountAmount: (order as DatabaseOrder).discount_amount || (order as Order).discountAmount,
    discountCode: (order as DatabaseOrder).discount_code || (order as Order).discountCode,
    shippingCost: (order as DatabaseOrder).shipping_cost || (order as Order).shippingCost,
  };

  const currentStatus = statusConfig[order.status as keyof typeof statusConfig];
  const Icon = currentStatus.icon;

  return (
    <>
      <Helmet>
        <title>{`Order ${orderData.orderNumber} Status - Lion\'s Mane Labs UK`}</title>
        <meta name="description" content={`Track your Lion\'s Mane Labs order ${orderData.orderNumber}`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${currentStatus.color}`}>
            <Icon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order {orderData.orderNumber}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{currentStatus.description}</p>
          <div className="text-sm text-gray-500">
            Ordered on {new Date(orderData.createdAt).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage(order.status)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Order Received</span>
            <span>Confirmed</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status Details */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status</h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${currentStatus.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{currentStatus.label}</div>
                  <div className="text-sm text-gray-600">{currentStatus.description}</div>
                </div>
              </div>
              
                             {/* Tracking Information */}
               {orderData.trackingNumber && orderData.trackingNumber !== 'Shipped' && (
                 <div className="border-t border-gray-200 pt-4">
                   <h3 className="font-medium text-gray-900 mb-2">Tracking Information</h3>
                   <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                     <div className="flex items-center justify-between">
                       <div>
                         <p className="text-sm font-medium text-blue-900">Royal Mail Tracking</p>
                         <p className="text-lg font-mono text-blue-700">{orderData.trackingNumber}</p>
                       </div>
                       <a
                         href={`https://www.royalmail.com/track-your-item#/tracking-results/${orderData.trackingNumber}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                       >
                         Track Package
                       </a>
                     </div>
                   </div>
                 </div>
               )}
               
               {/* Shipped without tracking notice */}
               {order.status === 'shipped' && (!orderData.trackingNumber || orderData.trackingNumber === 'Shipped') && (
                 <div className="border-t border-gray-200 pt-4">
                   <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                     <p className="text-sm text-blue-800">
                       📦 Your order has been shipped! Tracking information will be provided when available.
                     </p>
                   </div>
                 </div>
               )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
              <div className="text-gray-600">
                <p className="font-medium text-gray-900">{orderData.customerName}</p>
                <p>{orderData.shippingAddress?.addressLine1}</p>
                {orderData.shippingAddress?.addressLine2 && <p>{orderData.shippingAddress.addressLine2}</p>}
                <p>{orderData.shippingAddress?.city}, {orderData.shippingAddress?.postalCode}</p>
                <p>{orderData.shippingAddress?.country}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{item.productTitle}</h4>
                      <p className="text-xs text-gray-500">{item.variantLabel}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">£{orderData.subtotal.toFixed(2)}</span>
                </div>
                {orderData.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({orderData.discountCode}):</span>
                    <span>-£{orderData.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">
                    {orderData.shippingCost === 0 ? 'Free' : `£${orderData.shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>£{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Shop More Products
            </Link>
            <a
              href="mailto:support@lionsmanelabs.co.uk"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Need help? Contact us at <a href="mailto:support@lionsmanelabs.co.uk" className="text-blue-600 hover:underline">support@lionsmanelabs.co.uk</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage; 