import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { HiPlus, HiMinus, HiTrash, HiShoppingBag } from 'react-icons/hi';

const CartDrawer: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, closeCart, openCart } = useCart();

  // Close cart on escape key only (hover behavior handled by parent)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (cart.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [cart.isOpen, closeCart]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (!cart.isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-72 sm:w-96 max-w-[calc(100vw-1rem)] z-50"
      onMouseEnter={openCart}
      onMouseLeave={closeCart}
    >
      {/* Cart Dropdown */}
      <div className="cart-dropdown bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 sm:max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Cart ({cart.totalItems})
          </h2>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-3 max-h-64">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <HiShoppingBag className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-xs text-gray-500 text-center mb-4">
                Add some products to get started!
              </p>
              <Link
                to="/products"
                onClick={closeCart}
                className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Shop Products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                  {/* Product Image */}
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="h-12 w-12 object-cover rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-gray-900 truncate">
                      {item.productTitle}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.variantLabel}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <HiMinus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium text-gray-900 min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <HiPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-0.5 text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <HiTrash className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              {cart.items.length > 3 && (
                <div className="text-center py-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    +{cart.items.length - 3} more item{cart.items.length - 3 !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-3 space-y-3">
            {/* Total Savings Display */}
            {cart.subtotal > cart.total && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-600 font-medium">Total Savings</span>
                <span className="text-green-600 font-medium">
                  -£{(cart.subtotal - cart.total).toFixed(2)}
                </span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">£{cart.total.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/cart"
                onClick={closeCart}
                className="w-full bg-gray-100 text-gray-900 py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-gray-200 transition-colors block"
              >
                View Cart ({cart.totalItems})
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full bg-blue-600 text-white py-2 px-3 rounded-md text-center text-sm font-medium hover:bg-blue-700 transition-colors block"
              >
                Checkout
              </Link>
            </div>

            {/* Free shipping notice */}
            {cart.total < 30 && (
              <p className="text-xs text-gray-500 text-center">
                Add £{(30 - cart.total).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer; 