import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { HiPlus, HiMinus, HiTrash, HiShoppingBag, HiX } from 'react-icons/hi';

const CartModal: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, closeCartModal } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (cart.isModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cart.isModalOpen]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (!cart.isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Cart ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={closeCartModal}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <HiX className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <HiShoppingBag className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-center mb-6 text-sm">
                Add some products to get started!
              </p>
              <Link
                to="/products"
                onClick={closeCartModal}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Shop Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Cart Items */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productTitle}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <HiShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-2">{item.productTitle}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {Object.entries(item.selectedVariants)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(', ')}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-base font-semibold text-gray-900">
                            £{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm line-through text-gray-500">
                              £{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1.5 rounded hover:bg-gray-100 transition-colors border border-gray-300"
                            aria-label="Decrease quantity"
                          >
                            <HiMinus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="w-10 text-center font-medium text-base">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1.5 rounded hover:bg-gray-100 transition-colors border border-gray-300"
                            aria-label="Increase quantity"
                          >
                            <HiPlus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="text-right min-w-[70px]">
                          <div className="text-sm text-gray-500">Subtotal</div>
                          <div className="font-semibold text-gray-900 text-base">
                            £{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded hover:bg-red-100 transition-colors text-red-600"
                          aria-label="Remove item"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-80 border-l border-gray-200 p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-medium text-sm">£{cart.subtotal.toFixed(2)}</span>
                </div>

                {/* Discount */}
                {cart.discountAmount > 0 && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Discount ({cart.discountCode})</span>
                    <span className="font-medium text-sm">-£{cart.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Free Shipping Message */}
                {cart.subtotal < 30 ? (
                  <div className="mb-3 text-sm text-gray-600">
                    Add £{(30 - cart.subtotal).toFixed(2)} more for free shipping
                  </div>
                ) : (
                  <div className="mb-3 text-sm text-gray-600">
                    Free shipping applied
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="font-medium text-sm text-gray-900">
                    {cart.subtotal >= 30 ? 'Free' : 'Calculated at checkout'}
                  </span>
                </div>

                {/* Total */}
                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      £{cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/cart"
                    onClick={closeCartModal}
                    className="w-full bg-white py-3 px-4 text-gray-900 font-semibold rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center text-base block whitespace-nowrap"
                    style={{ border: '1px solid #d1d5db' }}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCartModal}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold text-base block whitespace-nowrap"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCartModal}
                    className="w-full text-gray-500 py-2 px-4 hover:text-gray-700 transition-colors text-center text-base whitespace-nowrap"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center whitespace-nowrap">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Secure Checkout
                    </div>
                    <div className="flex items-center whitespace-nowrap">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Free UK Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
