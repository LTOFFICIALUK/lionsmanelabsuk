declare module '*.jpg' {
  const content: string;
  export default content;
}

// SVG module declarations
declare module '*.svg' {
  const content: string;
  export default content;
}

// PNG module declarations
declare module '*.png' {
  const value: any;
  export default value;
}

// WebP module declarations
declare module '*.webp' {
  const content: string;
  export default content;
}

export type ProductCategory = 'blue-lotus-flower-tea-bags' | 'blue-lotus-flower' | 'blue-lotus-flower-smoking' | 'blue-lotus-flower-packs';

export type GuideCategory = 'getting-started' | 'brewing-guides' | 'wellness' | 'recipes' | 'general' | 'usage-guides' | 'product-information' | 'education' | 'culture-history' | 'comparison-guides';

export interface GuideMetadata {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  publishDate: string;
  author?: string;
}

export interface ProductVariant {
  value: string;
  label: string;
  price: number;
  salePrice?: number;
}

export interface ProductVariantGroup {
  name: string;
  label: string;
  options: ProductVariant[];
}

export interface ProductShippingMethod {
  name: string;
  price: number;
  estimatedDays: string;
}

export interface ProductSpecification {
  icon?: 'weight' | 'packSize' | 'quantity' | 'origin' | 'storage' | 'custom';
  label: string;
  value: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  description: string;
}

export interface ProductDetailsContent {
  description?: {
    content: string[];
    schema?: Record<string, any>;
  };
  specifications?: {
    content: ProductSpecification[];
    schema?: Record<string, any>[];
  };
  instructions?: {
    content: string[];
    schema?: Record<string, any>;
  };
  shipping?: {
    content: ProductShippingMethod[];
    freeShippingThreshold?: number;
    schema?: Record<string, any>[];
  };
  relatedArticles?: RelatedArticle[];
}

export interface Product {
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: {
    main: string;
    thumbnail: string;
    additional: string[];
  };
  variants: (ProductVariant | ProductVariantGroup)[];
  reviews: ProductReview[];
  details: ProductDetailsContent; // Add this new field
}

export interface Products {
  [key: string]: Product;
}

// Cart and Order Types
export interface CartItem {
  id: string; // unique identifier for cart item
  productSlug: string;
  productTitle: string;
  productImage: string;
  price: number; // actual price after discounts
  originalPrice: number; // original price
  salePrice: number; // sale price before any discount codes
  quantity: number;
  selectedVariants: {[key: string]: string};
  variantLabel: string; // human readable variant description
  isUpgrade?: boolean; // indicates if this item was upgraded
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  discountCodeDetails?: DiscountCode; // Store the full discount code details for recalculation
  total: number;
  isOpen: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface BillingAddress extends ShippingAddress {
  email: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount?: number;
  max_uses?: number;
  current_uses: number;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiscountCodeUsage {
  id: string;
  discount_code_id: string;
  order_id: string;
  customer_email: string;
  used_at: string;
  discount_amount: number;
  order_total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingMethod {
    id: number;
    name: string;
    price: number;
    isTracked: boolean;
    estimatedDays: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    discountAmount: number;
    discountCode?: string;
    shippingMethod: ShippingMethod;
    shippingCost: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  addToCartSilently: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  replaceCartItem: (itemId: string, newItem: Omit<CartItem, 'id'>) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyDiscountCode: (code: string) => Promise<boolean>;
  removeDiscountCode: () => void;
} 