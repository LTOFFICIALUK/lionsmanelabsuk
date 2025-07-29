import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartItem, CartContextType, DiscountCode } from '../types';
import { discountService } from '../utils/discount-service';

// Initial cart state
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discountAmount: 0,
  discountCode: undefined,
  total: 0,
  isOpen: false,
};

// Cart action types
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'id'> }
  | { type: 'ADD_TO_CART_SILENT'; payload: Omit<CartItem, 'id'> }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: string } }
  | { type: 'REPLACE_CART_ITEM'; payload: { itemId: string; newItem: Omit<CartItem, 'id'> } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; discountAmount: number; discountCodeDetails: DiscountCode } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'RECALCULATE_DISCOUNT' }
  | { type: 'LOAD_CART'; payload: CartState };

// Utility function to calculate cart totals
const calculateTotals = (items: CartItem[], discountAmount: number = 0) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);
  
  return { subtotal, totalItems, total };
};

// Utility function to generate unique cart item ID
const generateCartItemId = (item: Omit<CartItem, 'id'>): string => {
  const variantString = Object.entries(item.selectedVariants)
    .map(([key, value]) => `${key}:${value}`)
    .join(',');
  return `${item.productSlug}-${variantString}`;
};

// Mock discount codes (replace with API call later)
const mockDiscountCodes: DiscountCode[] = [
  {
    id: 'mock-1',
    code: 'WELCOME10',
    description: 'Welcome discount - 10% off orders over £20',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_amount: 20,
    max_uses: 100,
    current_uses: 25,
    start_date: new Date().toISOString(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    code: 'SAVE5',
    description: 'Save £5 on orders over £30',
    discount_type: 'fixed',
    discount_value: 5,
    min_order_amount: 30,
    max_uses: 50,
    current_uses: 12,
    start_date: new Date().toISOString(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = { ...action.payload, id: generateCartItemId(action.payload) };
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, newItem];
      }
      
      // Recalculate discount if one is applied
      let newDiscountAmount = state.discountAmount;
      if (state.discountCode && state.discountCodeDetails) {
        const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      }
      
      const totals = calculateTotals(newItems, newDiscountAmount);
      return {
        ...state,
        items: newItems,
        discountAmount: newDiscountAmount,
        ...totals,
        isOpen: true, // Open cart when item is added
      };
    }
    
    case 'ADD_TO_CART_SILENT': {
      const newItem = { ...action.payload, id: generateCartItemId(action.payload) };
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, newItem];
      }
      
      // Recalculate discount if one is applied
      let newDiscountAmount = state.discountAmount;
      if (state.discountCode && state.discountCodeDetails) {
        const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      }
      
      const totals = calculateTotals(newItems, newDiscountAmount);
      return {
        ...state,
        items: newItems,
        discountAmount: newDiscountAmount,
        ...totals,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(item => item.id !== itemId);
        
        // Recalculate discount if one is applied
        let newDiscountAmount = state.discountAmount;
        if (state.discountCode && state.discountCodeDetails) {
          const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
        }
        
        const totals = calculateTotals(newItems, newDiscountAmount);
        return {
          ...state,
          items: newItems,
          discountAmount: newDiscountAmount,
          ...totals,
        };
      }
      
      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      // Recalculate discount if one is applied
      let newDiscountAmount = state.discountAmount;
      if (state.discountCode && state.discountCodeDetails) {
        const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      }
      
      const totals = calculateTotals(newItems, newDiscountAmount);
      
      return {
        ...state,
        items: newItems,
        discountAmount: newDiscountAmount,
        ...totals,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      
      // Recalculate discount if one is applied
      let newDiscountAmount = state.discountAmount;
      if (state.discountCode && state.discountCodeDetails) {
        const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      }
      
      const totals = calculateTotals(newItems, newDiscountAmount);
      
      return {
        ...state,
        items: newItems,
        discountAmount: newDiscountAmount,
        ...totals,
      };
    }
    
    case 'REPLACE_CART_ITEM': {
      const { itemId, newItem } = action.payload;
      const newItemWithId = { ...newItem, id: generateCartItemId(newItem) };
      
      const newItems = state.items.map(item =>
        item.id === itemId ? newItemWithId : item
      );
      
      // Recalculate discount if one is applied
      let newDiscountAmount = state.discountAmount;
      if (state.discountCode && state.discountCodeDetails) {
        const newSubtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        newDiscountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      }
      
      const totals = calculateTotals(newItems, newDiscountAmount);
      
      return {
        ...state,
        items: newItems,
        discountAmount: newDiscountAmount,
        ...totals,
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...initialCartState,
        isOpen: state.isOpen,
      };
    }
    
    case 'OPEN_CART': {
      return {
        ...state,
        isOpen: true,
      };
    }
    
    case 'CLOSE_CART': {
      return {
        ...state,
        isOpen: false,
      };
    }
    
    case 'APPLY_DISCOUNT': {
      const totals = calculateTotals(state.items, action.payload.discountAmount);
      return {
        ...state,
        discountCode: action.payload.code,
        discountAmount: action.payload.discountAmount,
        discountCodeDetails: action.payload.discountCodeDetails,
        ...totals,
      };
    }
    
    case 'REMOVE_DISCOUNT': {
      const totals = calculateTotals(state.items, 0);
      return {
        ...state,
        discountCode: undefined,
        discountAmount: 0,
        ...totals,
      };
    }
    
    case 'RECALCULATE_DISCOUNT': {
      if (!state.discountCode || !state.discountCodeDetails) {
        return state; // No discount to recalculate
      }
      
      // Recalculate discount based on current cart total
      const newSubtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const discountAmount = discountService.calculateDiscountAmount(state.discountCodeDetails, newSubtotal);
      
      const totals = calculateTotals(state.items, discountAmount);
      return {
        ...state,
        discountAmount,
        ...totals,
      };
    }
    
    case 'LOAD_CART': {
      return action.payload;
    }
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage keys
const CART_STORAGE_KEY = 'blueDreamTea_cart';
const CART_TIMESTAMP_KEY = 'blueDreamTea_cart_timestamp';

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from local storage on mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const savedTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
        
        if (savedCart && savedTimestamp) {
          // Check if cart is not older than 7 days
          const cartAge = Date.now() - parseInt(savedTimestamp);
          const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
          
          if (cartAge < maxAge) {
            const parsedCart = JSON.parse(savedCart);
            // Ensure cart is closed when loading from storage
            dispatch({ 
              type: 'LOAD_CART', 
              payload: { ...parsedCart, isOpen: false } 
            });
          } else {
            // Clear expired cart
            localStorage.removeItem(CART_STORAGE_KEY);
            localStorage.removeItem(CART_TIMESTAMP_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to local storage whenever cart changes
  useEffect(() => {
    try {
      if (cart.items.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
      } else {
        // Clear storage when cart is empty
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(CART_TIMESTAMP_KEY);
      }
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, [cart]);

  // Cart actions
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    
    // Track cart abandonment (for future email system)
    try {
      const abandonmentData = {
        timestamp: Date.now(),
        email: null, // Will be populated when user enters email in checkout
        items: [item],
      };
      localStorage.setItem('blueDreamTea_cart_abandonment', JSON.stringify(abandonmentData));
    } catch (error) {
      console.error('Error tracking cart abandonment:', error);
    }
  };

  const addToCartSilently = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_TO_CART_SILENT', payload: item });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
  };

  const replaceCartItem = (itemId: string, newItem: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'REPLACE_CART_ITEM', payload: { itemId, newItem } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  // Discount code validation using discount service
  const applyDiscountCode = async (code: string): Promise<boolean> => {
    try {
      const { data: discountCode, error } = await discountService.validateDiscountCode(code, cart.subtotal);
      
      if (error || !discountCode) {
        return false;
      }
      
      const discountAmount = discountService.calculateDiscountAmount(discountCode, cart.subtotal);
      
      dispatch({ 
        type: 'APPLY_DISCOUNT', 
        payload: { code: discountCode.code, discountAmount, discountCodeDetails: discountCode } 
      });
      
      return true;
    } catch (error) {
      console.error('Error applying discount code:', error);
      return false;
    }
  };

  const removeDiscountCode = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    addToCartSilently,
    updateQuantity,
    removeFromCart,
    replaceCartItem,
    clearCart,
    openCart,
    closeCart,
    applyDiscountCode,
    removeDiscountCode,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 