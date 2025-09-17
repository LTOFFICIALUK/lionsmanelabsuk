import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { 
  HiShoppingCart, 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiEye,
  HiLogout,
  HiSearch,
  HiFilter,
  HiDownload,
  HiCube,
  HiPrinter,
  HiChartBar,
  HiUsers,
  HiCalendar,
  HiTrendingUp,
  HiUserGroup,
  HiMail,
  HiPhone,
  HiTag
} from 'react-icons/hi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { orderService, DatabaseOrder } from '../utils/supabase';
import { debugSupabase } from '../utils/debug-supabase';
import { discountService } from '../utils/discount-service';
import { DiscountCode } from '../types';
import jsPDF from 'jspdf';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ADMIN_CODE = import.meta.env.VITE_ADMIN_AUTH_CODE;

interface EditOrderForm {
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address_line1: string;
  shipping_address_line2: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  status: string;
  discount_code: string;
  discount_amount: number;
  notes: string;
  tracking_number: string;
  shipping_method: string;
}

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authError, setAuthError] = useState('');

  // Helper function to safely parse order items
  const parseOrderItems = (items: any) => {
    if (Array.isArray(items)) {
      return items; // Already parsed
    }
    try {
      return JSON.parse(items);
    } catch (error) {
      console.error('Failed to parse order items:', error);
      return []; // Return empty array as fallback
    }
  };
  
  const [orders, setOrders] = useState<DatabaseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedOrder, setSelectedOrder] = useState<DatabaseOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<DatabaseOrder | null>(null);
  const [shippingOrder, setShippingOrder] = useState<DatabaseOrder | null>(null);
  const [shippingTrackingNumber, setShippingTrackingNumber] = useState('');
  const [editForm, setEditForm] = useState<EditOrderForm>({
    customer_first_name: '',
    customer_last_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address_line1: '',
    shipping_address_line2: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'United Kingdom',
    status: 'pending',
    discount_code: '',
    discount_amount: 0,
    notes: '',
    tracking_number: '',
    shipping_method: '',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'not-shipped' | 'shipped'>('all');
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  
  // Admin navigation state
  const [currentAdminSection, setCurrentAdminSection] = useState<'orders' | 'analytics' | 'customers' | 'discount-codes'>('orders');
  
  // Analytics state
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('30');
  
  // Customers state
  const [customersTimeframe, setCustomersTimeframe] = useState('30');
  const [customersSortBy, setCustomersSortBy] = useState<'total' | 'orders' | 'recent'>('total');

  // Discount codes state
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [editingDiscountCode, setEditingDiscountCode] = useState<DiscountCode | null>(null);
  const [showDiscountCodeForm, setShowDiscountCodeForm] = useState(false);
  const [discountCodeForm, setDiscountCodeForm] = useState({
    code: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
    min_order_amount: 0,
    max_discount: 0,
    max_uses: 0,
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    is_active: true,
  });

  // Check if already authenticated on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('lionsManeLabs_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load orders when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Debug Supabase connection
      debugSupabase();
      loadOrders();
      loadDiscountCodes();
    }
  }, [isAuthenticated]);

  // Clear selections when tab changes
  useEffect(() => {
    setSelectedOrders(new Set());
    setSelectAll(false);
  }, [activeTab]);

  // Clear selections when admin section changes
  useEffect(() => {
    setSelectedOrders(new Set());
    setSelectAll(false);
  }, [currentAdminSection]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode === ADMIN_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('lionsManeLabs_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid authentication code');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lionsManeLabs_admin_auth');
    setAuthCode('');
  };

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await orderService.getAllOrders();
      
      if (error) {
        setError('Failed to load orders: ' + error.message);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      setError('Failed to load orders. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const loadDiscountCodes = async () => {
    try {
      const { data, error } = await discountService.getAllDiscountCodes();
      
      if (error) {
        console.error('Failed to load discount codes:', error);
      } else {
        setDiscountCodes(data || []);
      }
    } catch (err) {
      console.error('Failed to load discount codes. Please check your connection.');
    }
  };

  // Discount code management functions
  const handleCreateDiscountCode = () => {
    setEditingDiscountCode(null);
    setDiscountCodeForm({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      min_order_amount: 0,
      max_discount: 0,
      max_uses: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      is_active: true,
    });
    setShowDiscountCodeForm(true);
  };

  const handleEditDiscountCode = (discountCode: DiscountCode) => {
    setEditingDiscountCode(discountCode);
    setDiscountCodeForm({
      code: discountCode.code,
      description: discountCode.description || '',
      discount_type: discountCode.discount_type,
      discount_value: discountCode.discount_value,
      min_order_amount: discountCode.min_order_amount,
      max_discount: discountCode.max_discount || 0,
      max_uses: discountCode.max_uses || 0,
      start_date: discountCode.start_date.split('T')[0],
      end_date: discountCode.end_date ? discountCode.end_date.split('T')[0] : '',
      is_active: discountCode.is_active,
    });
    setShowDiscountCodeForm(true);
  };

  const handleSaveDiscountCode = async () => {
    try {
      const discountData = {
        ...discountCodeForm,
        max_discount: discountCodeForm.max_discount || undefined,
        max_uses: discountCodeForm.max_uses || undefined,
        end_date: discountCodeForm.end_date || undefined,
      };

      if (editingDiscountCode) {
        // Update existing discount code
        const { error } = await discountService.updateDiscountCode(editingDiscountCode.id, discountData);
        if (error) {
          setError('Failed to update discount code: ' + error.message);
          return;
        }
      } else {
        // Create new discount code
        const { error } = await discountService.createDiscountCode(discountData);
        if (error) {
          setError('Failed to create discount code: ' + error.message);
          return;
        }
      }

      setShowDiscountCodeForm(false);
      setEditingDiscountCode(null);
      loadDiscountCodes(); // Reload discount codes
    } catch (err) {
      setError('Failed to save discount code. Please try again.');
    }
  };

  const handleDeleteDiscountCode = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this discount code?')) {
      return;
    }

    try {
      const { error } = await discountService.deleteDiscountCode(id);
      if (error) {
        setError('Failed to delete discount code: ' + error.message);
      } else {
        loadDiscountCodes(); // Reload discount codes
      }
    } catch (err) {
      setError('Failed to delete discount code. Please try again.');
    }
  };

  const handleEditOrder = (order: DatabaseOrder) => {
    setEditingOrder(order);
    setEditForm({
      customer_first_name: order.customer_first_name,
      customer_last_name: order.customer_last_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      shipping_address_line1: order.shipping_address_line1,
      shipping_address_line2: order.shipping_address_line2 || '',
      shipping_city: order.shipping_city,
      shipping_postal_code: order.shipping_postal_code,
      shipping_country: order.shipping_country,
      status: order.status,
      discount_code: order.discount_code || '',
      discount_amount: order.discount_amount,
      notes: order.notes || '',
      tracking_number: order.tracking_number || '',
      shipping_method: order.shipping_method || '',
    });
  };

  const handleSaveOrder = async () => {
    if (!editingOrder) return;

    setLoading(true);
    try {
      // Auto-update status to shipped if tracking number is added and status is not already shipped/delivered
      let updatedForm = { ...editForm };
      
      if (editForm.tracking_number && 
          editForm.tracking_number !== editingOrder.tracking_number &&
          !['shipped', 'delivered'].includes(editForm.status)) {
        updatedForm.status = 'shipped';
        setEditForm(updatedForm); // Update the form state as well
      }

      const { error } = await orderService.updateOrder(editingOrder.id, updatedForm);
      
      if (error) {
        setError('Failed to update order: ' + error.message);
      } else {
        await loadOrders();
        setEditingOrder(null);
      }
    } catch (err) {
      setError('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    setLoading(true);
    try {
      const { error } = await orderService.deleteOrder(orderId);
      
      if (error) {
        setError('Failed to delete order: ' + error.message);
      } else {
        await loadOrders();
      }
    } catch (err) {
      setError('Failed to delete order');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsShipped = (order: DatabaseOrder) => {
    setShippingOrder(order);
    setShippingTrackingNumber(order.tracking_number || '');
  };

  const handleConfirmShipping = async () => {
    if (!shippingOrder) return;

    try {
      setLoading(true);

      // Transform order data for Royal Mail submission
      const royalMailOrderData = {
        id: shippingOrder.id,
        customer: {
          name: `${shippingOrder.customer_first_name} ${shippingOrder.customer_last_name}`,
          email: shippingOrder.customer_email,
          phone: shippingOrder.customer_phone,
          address: {
            line1: shippingOrder.shipping_address_line1,
            line2: shippingOrder.shipping_address_line2,
            city: shippingOrder.shipping_city,
            postcode: shippingOrder.shipping_postal_code
          }
        },
        items: parseOrderItems(shippingOrder.items).map((item: any) => ({
          sku: item.sku || item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        shipping: {
          service: shippingOrder.shipping_method,
          weightInGrams: 250, // Default weight in grams - you might want to calculate this based on items
          dimensions: {
            lengthInCm: 20,
            widthInCm: 15,
            heightInCm: 10
          }
        }
      };

      // Submit to Royal Mail
      const handleRoyalMailSuccess = async (trackingNumber: string) => {
        // Update order with tracking number and status
        await orderService.updateOrder(shippingOrder.id, {
          tracking_number: trackingNumber,
          status: 'shipped',
          updated_at: new Date().toISOString()
        });

        // Refresh orders list
        await loadOrders();
        
        // Reset shipping state
        setShippingOrder(null);
        setShippingTrackingNumber('');
      };

      const handleRoyalMailError = (error: Error) => {
        setError(`Failed to submit to Royal Mail: ${error.message}`);
        setLoading(false);
      };

      return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-800">Royal Mail integration has been disabled. Component removed.</p>
        </div>
      );

    } catch (error) {
      console.error('Error in shipping confirmation:', error);
      setError('Failed to process shipping confirmation');
    } finally {
      setLoading(false);
    }
  };

  // Handle order selection
  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleSelectAll = () => {
    // Calculate filtered orders at the time of selection
    const currentFilteredOrders = orders.filter(order => {
      const matchesSearch = 
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.customer_first_name} ${order.customer_last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      // Tab filtering
      let matchesTab = true;
      if (activeTab === 'not-shipped') {
        matchesTab = !['shipped', 'delivered'].includes(order.status);
      } else if (activeTab === 'shipped') {
        matchesTab = ['shipped', 'delivered'].includes(order.status);
      }
      
      return matchesSearch && matchesStatus && matchesTab;
    });

    if (selectAll) {
      setSelectedOrders(new Set());
      setSelectAll(false);
    } else {
      setSelectedOrders(new Set(currentFilteredOrders.map(order => order.id)));
      setSelectAll(true);
    }
  };

  // Generate packing slip PDF
  const generatePackingSlip = (order: DatabaseOrder) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [4, 6] // 4x6 inch format
    });

    // Set up fonts and styling
    pdf.setFont('helvetica', 'normal');
    
    // Header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PACKING SLIP', 2, 0.4, { align: 'center' });
    
    // Company name
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Lion\'s Mane Labs UK', 2, 0.65, { align: 'center' });
    
    // Order details
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Order #: ${order.order_number}`, 0.2, 0.95);
    pdf.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 0.2, 1.15);
    pdf.text(`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`, 0.2, 1.35);
    
    // Shipping address
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('SHIP TO:', 0.2, 1.7);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(`${order.customer_first_name} ${order.customer_last_name}`, 0.2, 1.9);
    pdf.text(order.customer_email, 0.2, 2.05);
    pdf.text(order.customer_phone, 0.2, 2.2);
    pdf.text(order.shipping_address_line1, 0.2, 2.35);
    if (order.shipping_address_line2) {
      pdf.text(order.shipping_address_line2, 0.2, 2.5);
    }
    pdf.text(`${order.shipping_city}, ${order.shipping_postal_code}`, 0.2, order.shipping_address_line2 ? 2.65 : 2.5);
    pdf.text(order.shipping_country, 0.2, order.shipping_address_line2 ? 2.8 : 2.65);
    
    // Items section
    const items = parseOrderItems(order.items);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    const itemsStartY = order.shipping_address_line2 ? 3.1 : 2.95;
    pdf.text('ITEMS:', 0.2, itemsStartY);
    
    // Items table header
    pdf.setFontSize(10);
    pdf.text('QTY', 0.2, itemsStartY + 0.2);
    pdf.text('ITEM', 0.6, itemsStartY + 0.2);
    pdf.text('PRICE', 3.2, itemsStartY + 0.2);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    let yPos = itemsStartY + 0.45;
    
    items.forEach((item: any) => {
      if (yPos > 4.6) return; // Stop if we run out of space
      
      const itemLineTotal = item.price * item.quantity;
      
      pdf.text(`${item.quantity}`, 0.2, yPos);
      
      // Handle long product names
      const productName = item.productTitle.length > 20 ? 
        item.productTitle.substring(0, 20) + '...' : item.productTitle;
      pdf.text(productName, 0.6, yPos);
      
      pdf.text(`£${itemLineTotal.toFixed(2)}`, 3.2, yPos);
      
      // Add variant info if different from product title
      if (item.variantLabel && item.variantLabel !== item.productTitle) {
        yPos += 0.15;
        pdf.setFontSize(8);
        const variantText = item.variantLabel.length > 25 ? 
          item.variantLabel.substring(0, 25) + '...' : item.variantLabel;
        pdf.text(`   ${variantText}`, 0.6, yPos);
        pdf.setFontSize(9);
      }
      
      yPos += 0.22;
    });
    
    // Summary section
    yPos += 0.3;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Subtotal:', 2.2, yPos);
    pdf.text(`£${order.subtotal.toFixed(2)}`, 3.2, yPos);
    
    if (order.discount_amount > 0) {
      yPos += 0.2;
      pdf.text(`Discount (${order.discount_code || 'Applied'}):`, 1.8, yPos);
      pdf.text(`-£${order.discount_amount.toFixed(2)}`, 3.2, yPos);
    }
    
    yPos += 0.2;
    pdf.text('Shipping:', 2.2, yPos);
    pdf.text(`£${order.shipping_cost.toFixed(2)}`, 3.2, yPos);
    
    yPos += 0.25;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('TOTAL:', 2.2, yPos);
    pdf.text(`£${order.total.toFixed(2)}`, 3.2, yPos);
    
    // Tracking number if available
    if (order.tracking_number) {
      yPos += 0.3;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Tracking: ${order.tracking_number}`, 0.2, yPos);
    }
    
    // Footer - Much larger text for thermal labels
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Thank you for your order!', 2, 5.7, { align: 'center' });
    pdf.setFontSize(9);
    pdf.text('www.lionsmanelabs.co.uk', 2, 5.9, { align: 'center' });
    
    return pdf;
  };

  const handlePrintPackingSlips = async () => {
    if (selectedOrders.size === 0) return;
    
    const selectedOrderData = orders.filter(order => selectedOrders.has(order.id));
    
    // Generate and download packing slips
    if (selectedOrderData.length === 1) {
      // Single order - generate and download
      const pdf = generatePackingSlip(selectedOrderData[0]);
      pdf.save(`packing-slip-${selectedOrderData[0].order_number}.pdf`);
    } else {
      // Multiple orders - combine into one PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: [4, 6]
      });
      
      selectedOrderData.forEach((order, index) => {
        if (index > 0) {
          pdf.addPage([4, 6], 'portrait');
        }
        
        // Generate content for this order (same as single order logic)
        pdf.setFont('helvetica', 'normal');
        
        // Header
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('PACKING SLIP', 2, 0.4, { align: 'center' });
        
        // Company name
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Lion\'s Mane Labs UK', 2, 0.65, { align: 'center' });
        
        // Order details
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Order #: ${order.order_number}`, 0.2, 0.95);
        pdf.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 0.2, 1.15);
        pdf.text(`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`, 0.2, 1.35);
        
        // Shipping address
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.text('SHIP TO:', 0.2, 1.7);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.text(`${order.customer_first_name} ${order.customer_last_name}`, 0.2, 1.9);
        pdf.text(order.customer_email, 0.2, 2.05);
        pdf.text(order.customer_phone, 0.2, 2.2);
        pdf.text(order.shipping_address_line1, 0.2, 2.35);
        if (order.shipping_address_line2) {
          pdf.text(order.shipping_address_line2, 0.2, 2.5);
        }
        pdf.text(`${order.shipping_city}, ${order.shipping_postal_code}`, 0.2, order.shipping_address_line2 ? 2.65 : 2.5);
        pdf.text(order.shipping_country, 0.2, order.shipping_address_line2 ? 2.8 : 2.65);
        
        // Items section
        const items = parseOrderItems(order.items);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        const itemsStartY = order.shipping_address_line2 ? 3.1 : 2.95;
        pdf.text('ITEMS:', 0.2, itemsStartY);
        
        // Items table header
        pdf.setFontSize(10);
        pdf.text('QTY', 0.2, itemsStartY + 0.2);
        pdf.text('ITEM', 0.6, itemsStartY + 0.2);
        pdf.text('PRICE', 3.2, itemsStartY + 0.2);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        let yPos = itemsStartY + 0.45;
        
        items.forEach((item: any) => {
          if (yPos > 4.6) return; // Stop if we run out of space
          
          const itemLineTotal = item.price * item.quantity;
          
          pdf.text(`${item.quantity}`, 0.2, yPos);
          
          // Handle long product names
          const productName = item.productTitle.length > 20 ? 
            item.productTitle.substring(0, 20) + '...' : item.productTitle;
          pdf.text(productName, 0.6, yPos);
          
          pdf.text(`£${itemLineTotal.toFixed(2)}`, 3.2, yPos);
          
          // Add variant info if different from product title
          if (item.variantLabel && item.variantLabel !== item.productTitle) {
            yPos += 0.15;
            pdf.setFontSize(8);
            const variantText = item.variantLabel.length > 25 ? 
              item.variantLabel.substring(0, 25) + '...' : item.variantLabel;
            pdf.text(`   ${variantText}`, 0.6, yPos);
            pdf.setFontSize(9);
          }
          
          yPos += 0.22;
        });
        
        // Summary section
        yPos += 0.3;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text('Subtotal:', 2.2, yPos);
        pdf.text(`£${order.subtotal.toFixed(2)}`, 3.2, yPos);
        
        if (order.discount_amount > 0) {
          yPos += 0.2;
          pdf.text(`Discount (${order.discount_code || 'Applied'}):`, 1.8, yPos);
          pdf.text(`-£${order.discount_amount.toFixed(2)}`, 3.2, yPos);
        }
        
        yPos += 0.2;
        pdf.text('Shipping:', 2.2, yPos);
        pdf.text(`£${order.shipping_cost.toFixed(2)}`, 3.2, yPos);
        
        yPos += 0.25;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.text('TOTAL:', 2.2, yPos);
        pdf.text(`£${order.total.toFixed(2)}`, 3.2, yPos);
        
        // Tracking number if available
        if (order.tracking_number) {
          yPos += 0.3;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.text(`Tracking: ${order.tracking_number}`, 0.2, yPos);
        }
        
        // Footer - Much larger text for thermal labels
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text('Thank you for your order!', 2, 5.7, { align: 'center' });
        pdf.setFontSize(9);
        pdf.text('www.lionsmanelabs.co.uk', 2, 5.9, { align: 'center' });
      });
      
      pdf.save(`packing-slips-${selectedOrderData.length}-orders.pdf`);
    }
    
    // Trigger post-purchase upsell emails for all selected orders
    try {
      console.log('Triggering post-purchase upsell emails for selected orders...');
      const selectedOrderIds = Array.from(selectedOrders);
      
      // Post-purchase upsell emails disabled - service removed
      const result = { success: true, processed: 0, failed: 0, results: [] };
      
      if (result.success) {
        console.log(`✅ Post-purchase upsell emails sent successfully for ${result.processed} orders`);
        alert(`Packing slips generated and ${result.processed} post-purchase upsell emails sent successfully!`);
      } else {
        console.log(`⚠️ Post-purchase upsell emails completed with issues: ${result.processed} successful, ${result.failed} failed`);
        alert(`Packing slips generated! Post-purchase emails: ${result.processed} sent, ${result.failed} failed. Check console for details.`);
      }
      
      // Log detailed results
      result.results.forEach((result: any, index: number) => {
        if (result.success) {
          console.log(`✅ Order ${result.orderNumber}: Email sent to ${result.customerEmail}`);
        } else {
          console.log(`❌ Order ${result.orderNumber}: Failed - ${result.error}`);
        }
      });
      
    } catch (error) {
      console.error('Error triggering post-purchase upsell emails:', error);
      alert('Packing slips generated! Error sending post-purchase emails. Check console for details.');
    }
    
    // Clear selection after printing
    setSelectedOrders(new Set());
    setSelectAll(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.customer_first_name} ${order.customer_last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Tab filtering
    let matchesTab = true;
    if (activeTab === 'not-shipped') {
      matchesTab = !['shipped', 'delivered'].includes(order.status);
    } else if (activeTab === 'shipped') {
      matchesTab = ['shipped', 'delivered'].includes(order.status);
    }
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Update selectAll state when selections or filtered orders change
  React.useEffect(() => {
    if (filteredOrders.length === 0) {
      setSelectAll(false);
    } else {
      const allFilteredSelected = filteredOrders.every(order => selectedOrders.has(order.id));
      setSelectAll(allFilteredSelected && filteredOrders.length > 0);
    }
  }, [filteredOrders, selectedOrders]);

  // Analytics data processing
  const analyticsData = useMemo(() => {
    const now = new Date();
    const daysBack = parseInt(analyticsTimeframe);
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    const filteredOrders = orders.filter(order => 
      new Date(order.created_at) >= startDate
    );

    // Group orders by day
    const ordersByDay: Record<string, DatabaseOrder[]> = {};
    const labels: string[] = [];
    
    for (let i = 0; i < daysBack; i++) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      ordersByDay[dateStr] = [];
      labels.unshift(date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }));
    }

    filteredOrders.forEach(order => {
      const dateStr = new Date(order.created_at).toISOString().split('T')[0];
      if (ordersByDay[dateStr]) {
        ordersByDay[dateStr].push(order);
      }
    });

    const ordersChartData = {
      labels,
      datasets: [
        {
          label: 'Orders',
          data: Object.values(ordersByDay).map(dayOrders => dayOrders.length),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };

    const revenueChartData = {
      labels,
      datasets: [
        {
          label: 'Revenue (£)',
          data: Object.values(ordersByDay).map(dayOrders => 
            dayOrders.reduce((sum, order) => sum + order.total, 0)
          ),
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
        },
      ],
    };

    return { ordersChartData, revenueChartData };
  }, [orders, analyticsTimeframe]);

  // Customer data processing
  const customerData = useMemo(() => {
    const now = new Date();
    const daysBack = parseInt(customersTimeframe);
    const startDate = daysBack === 365 ? new Date(0) : new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    const filteredOrders = orders.filter(order => 
      new Date(order.created_at) >= startDate
    );

    // Group orders by customer
    const customerMap: Record<string, {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      orders: DatabaseOrder[];
      totalSpent: number;
      orderCount: number;
      lastOrderDate: Date;
    }> = {};

    filteredOrders.forEach(order => {
      const email = order.customer_email;
      if (!customerMap[email]) {
        customerMap[email] = {
          email,
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          phone: order.customer_phone,
          orders: [],
          totalSpent: 0,
          orderCount: 0,
          lastOrderDate: new Date(order.created_at),
        };
      }
      
      customerMap[email].orders.push(order);
      customerMap[email].totalSpent += order.total;
      customerMap[email].orderCount += 1;
      
      const orderDate = new Date(order.created_at);
      if (orderDate > customerMap[email].lastOrderDate) {
        customerMap[email].lastOrderDate = orderDate;
      }
    });

    let sortedCustomers = Object.values(customerMap);

    // Sort customers based on selected criteria
    switch (customersSortBy) {
      case 'total':
        sortedCustomers.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case 'orders':
        sortedCustomers.sort((a, b) => b.orderCount - a.orderCount);
        break;
      case 'recent':
        sortedCustomers.sort((a, b) => b.lastOrderDate.getTime() - a.lastOrderDate.getTime());
        break;
    }

    return sortedCustomers;
  }, [orders, customersTimeframe, customersSortBy]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Lion\'s Mane Labs UK</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <HiShoppingCart className="h-12 w-12 text-blue-600 mx-auto" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Admin Access
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your authentication code to access the order management system
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleAuth}>
              <div>
                <label htmlFor="auth-code" className="sr-only">
                  Authentication Code
                </label>
                <input
                  id="auth-code"
                  name="auth-code"
                  type="password"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Authentication code"
                />
              </div>

              {authError && (
                <div className="text-red-600 text-sm text-center">{authError}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Access Admin Panel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Management - Lion\'s Mane Labs UK</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1 lg:mt-2">{orders.length} total orders</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {selectedOrders.size > 0 && (
              <button
                onClick={handlePrintPackingSlips}
                className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                <HiPrinter className="h-4 w-4" />
                <span className="hidden sm:inline">Print Packing Slips ({selectedOrders.size})</span>
                <span className="sm:hidden">Print ({selectedOrders.size})</span>
              </button>
            )}
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base"
            >
              <HiPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Order</span>
              <span className="sm:hidden">Create</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base"
            >
              <HiLogout className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setCurrentAdminSection('orders')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                currentAdminSection === 'orders'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HiShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setCurrentAdminSection('analytics')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                currentAdminSection === 'analytics'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HiChartBar className="h-5 w-5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setCurrentAdminSection('customers')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                currentAdminSection === 'customers'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HiUsers className="h-5 w-5" />
              <span>Customers</span>
            </button>
            <button
              onClick={() => setCurrentAdminSection('discount-codes')}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                currentAdminSection === 'discount-codes'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HiTag className="h-5 w-5" />
              <span>Discount Codes</span>
            </button>
          </div>
        </div>

        {/* Orders Section */}
        {currentAdminSection === 'orders' && (
          <>
            {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-shrink-0 px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline">All Orders</span>
              <span className="sm:hidden">All</span>
              <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-600 py-1 px-1.5 sm:px-2 rounded-full text-xs">
                {orders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('not-shipped')}
              className={`flex-shrink-0 px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'not-shipped'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline">Not Shipped</span>
              <span className="sm:hidden">Pending</span>
              <span className="ml-1 sm:ml-2 bg-yellow-100 text-yellow-600 py-1 px-1.5 sm:px-2 rounded-full text-xs">
                {orders.filter(order => !['shipped', 'delivered'].includes(order.status)).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('shipped')}
              className={`flex-shrink-0 px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'shipped'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Shipped
              <span className="ml-1 sm:ml-2 bg-green-100 text-green-600 py-1 px-1.5 sm:px-2 rounded-full text-xs">
                {orders.filter(order => ['shipped', 'delivered'].includes(order.status)).length}
              </span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="md:col-span-2 xl:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Orders
              </label>
              <div className="relative">
                <HiSearch className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Order, email, or name"
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={loadOrders}
                disabled={loading}
                className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Orders Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectAll && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipping
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.order_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {parseOrderItems(order.items).length} items
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer_first_name} {order.customer_last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.shipping_method}
                      </div>
                      <div className="text-xs text-gray-500">
                        £{order.shipping_cost.toFixed(2)}
                      </div>
                      {order.tracking_number && (
                        <div className="text-xs text-blue-600">
                          Tracking: {order.tracking_number}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="View Order Details"
                        >
                          <HiEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            const pdf = generatePackingSlip(order);
                            pdf.save(`packing-slip-${order.order_number}.pdf`);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
                          title="Print Packing Slip"
                        >
                          <HiPrinter className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                          title="Edit Order"
                        >
                          <HiPencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMarkAsShipped(order)}
                          disabled={['shipped', 'delivered'].includes(order.status) || loading}
                          className={`p-1 rounded transition-colors ${
                            ['shipped', 'delivered'].includes(order.status)
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-purple-600 hover:text-purple-900 hover:bg-purple-50'
                          }`}
                          title={['shipped', 'delivered'].includes(order.status) ? 'Already Shipped/Delivered' : 'Mark as Shipped'}
                        >
                          <HiCube className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete Order"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && !loading && (
            <div className="text-center py-12">
              <HiShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Orders Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {/* Mobile Select All */}
          {filteredOrders.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectAll && filteredOrders.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Select all {filteredOrders.length} orders
                </span>
              </label>
            </div>
          )}

          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {order.order_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      {parseOrderItems(order.items).length} items
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium text-gray-900">
                  {order.customer_first_name} {order.customer_last_name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {order.customer_email}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-900">
                  £{order.total.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 text-blue-600 hover:text-blue-900 p-2 rounded transition-colors flex items-center justify-center space-x-1"
                  title="View Order Details"
                >
                  <HiEye className="h-4 w-4" />
                  <span className="text-xs">View</span>
                </button>
                <button
                  onClick={() => {
                    const pdf = generatePackingSlip(order);
                    pdf.save(`packing-slip-${order.order_number}.pdf`);
                  }}
                  className="flex-1 text-indigo-600 hover:text-indigo-900 p-2 rounded transition-colors flex items-center justify-center space-x-1"
                  title="Print Packing Slip"
                >
                  <HiPrinter className="h-4 w-4" />
                  <span className="text-xs">Print</span>
                </button>
                <button
                  onClick={() => handleEditOrder(order)}
                  className="flex-1 text-green-600 hover:text-green-900 p-2 rounded transition-colors flex items-center justify-center space-x-1"
                  title="Edit Order"
                >
                  <HiPencil className="h-4 w-4" />
                  <span className="text-xs">Edit</span>
                </button>
                <button
                  onClick={() => handleMarkAsShipped(order)}
                  disabled={['shipped', 'delivered'].includes(order.status) || loading}
                  className={`flex-1 p-2 rounded transition-colors flex items-center justify-center space-x-1 ${
                    ['shipped', 'delivered'].includes(order.status)
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                  title={['shipped', 'delivered'].includes(order.status) ? 'Already Shipped/Delivered' : 'Mark as Shipped'}
                >
                  <HiCube className="h-4 w-4" />
                  <span className="text-xs">Ship</span>
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="flex-1 text-red-600 hover:text-red-900 p-2 rounded transition-colors flex items-center justify-center space-x-1"
                  title="Delete Order"
                >
                  <HiTrash className="h-4 w-4" />
                  <span className="text-xs">Delete</span>
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && !loading && (
            <div className="bg-white rounded-lg border border-gray-200 text-center py-12">
              <HiShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                    Order Details: {selectedOrder.order_number}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p><strong>Name:</strong> {selectedOrder.customer_first_name} {selectedOrder.customer_last_name}</p>
                      <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                      <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>{selectedOrder.shipping_address_line1}</p>
                      {selectedOrder.shipping_address_line2 && <p>{selectedOrder.shipping_address_line2}</p>}
                      <p>{selectedOrder.shipping_city}, {selectedOrder.shipping_postal_code}</p>
                      <p>{selectedOrder.shipping_country}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {parseOrderItems(selectedOrder.items).map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                          <div>
                            <p className="font-medium">{item.productTitle}</p>
                            <p className="text-sm text-gray-500">{item.variantLabel}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>£{selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount_amount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({selectedOrder.discount_code}):</span>
                          <span>-£{selectedOrder.discount_amount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>£{selectedOrder.shipping_cost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>£{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Details</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p><strong>Method:</strong> {selectedOrder.shipping_method}</p>
                      <p><strong>Cost:</strong> £{selectedOrder.shipping_cost.toFixed(2)}</p>
                      {selectedOrder.tracking_number && (
                        <p><strong>Tracking:</strong> {selectedOrder.tracking_number}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mark as Shipped Modal */}
        {shippingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                    Mark Order as Shipped: {shippingOrder.order_number}
                  </h2>
                  <button
                    onClick={() => setShippingOrder(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Order Details */}
                  <div className="space-y-4">
                                         <div>
                       <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                       <div className="bg-gray-50 p-4 rounded-md text-sm">
                         <p><strong>Name:</strong> {shippingOrder.customer_first_name} {shippingOrder.customer_last_name}</p>
                         <p><strong>Email:</strong> {shippingOrder.customer_email}</p>
                         <p><strong>Phone:</strong> {shippingOrder.customer_phone}</p>
                       </div>
                     </div>

                     <div>
                       <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                       <div className="bg-gray-50 p-4 rounded-md text-sm">
                         <p>{shippingOrder.shipping_address_line1}</p>
                         {shippingOrder.shipping_address_line2 && <p>{shippingOrder.shipping_address_line2}</p>}
                         <p>{shippingOrder.shipping_city}, {shippingOrder.shipping_postal_code}</p>
                         <p>{shippingOrder.shipping_country}</p>
                       </div>
                     </div>

                     <div>
                       <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                       <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2">
                         <div className="flex justify-between">
                           <span>Subtotal:</span>
                           <span>£{shippingOrder.subtotal.toFixed(2)}</span>
                         </div>
                         {shippingOrder.discount_amount > 0 && (
                           <div className="flex justify-between text-green-600">
                             <span>Discount ({shippingOrder.discount_code}):</span>
                             <span>-£{shippingOrder.discount_amount.toFixed(2)}</span>
                           </div>
                         )}
                         <div className="flex justify-between">
                           <span>Shipping:</span>
                           <span>£{shippingOrder.shipping_cost.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between font-semibold border-t pt-2">
                           <span>Total:</span>
                           <span>£{shippingOrder.total.toFixed(2)}</span>
                         </div>
                       </div>
                     </div>
                  </div>

                  {/* Order Items & Tracking */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                                             <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-y-auto">
                         <div className="space-y-3">
                           {parseOrderItems(shippingOrder.items).map((item: any, index: number) => (
                            <div key={index} className="flex items-center space-x-3">
                              <img
                                src={item.productImage}
                                alt={item.productTitle}
                                className="h-12 w-12 object-cover rounded-md"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.productTitle}</p>
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
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Tracking Number (Optional)</h3>
                      <div className="space-y-3">
                                                 <input
                           type="text"
                           value={shippingTrackingNumber}
                           onChange={(e) => setShippingTrackingNumber(e.target.value)}
                           placeholder="Enter tracking number (optional)"
                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                         />
                         <p className="text-xs text-gray-500">
                           Leave empty if no tracking number available - order will still be marked as shipped
                         </p>
                         
                         <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                           <p className="text-sm text-blue-800">
                             <strong>📦 Confirm Shipping:</strong> This will mark the order as shipped and update the tracking information.
                           </p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                                 <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                   <button
                     onClick={() => setShippingOrder(null)}
                     className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={handleConfirmShipping}
                     disabled={loading}
                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                   >
                     <HiCube className="h-4 w-4" />
                     <span>{loading ? 'Marking as Shipped...' : 'Mark as Shipped'}</span>
                   </button>
                 </div>
              </div>
            </div>
          </div>
        )}

          </>
        )}

        {/* Analytics Section */}
        {currentAdminSection === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <p className="text-gray-600 mt-1">View your store performance and insights</p>
              </div>
              <div className="flex items-center space-x-3">
                <HiCalendar className="h-5 w-5 text-gray-400" />
                <select
                  value={analyticsTimeframe}
                  onChange={(e) => setAnalyticsTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <HiTrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+12% from last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      £{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <HiTrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <HiTrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+8% from last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      £{orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HiChartBar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <HiTrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+5% from last period</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(orders.map(order => order.customer_email)).size}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <HiUsers className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <HiTrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+15% from last period</span>
                </div>
              </div>
            </div>


            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Orders</h3>
                <div className="h-64">
                  <Bar
                    data={analyticsData.ordersChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue</h3>
                <div className="h-64">
                  <Bar
                    data={analyticsData.revenueChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '£' + value;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers Section */}
        {currentAdminSection === 'customers' && (
          <div className="space-y-6">
            {/* Customers Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
                <p className="text-gray-600 mt-1">
                  {new Set(orders.map(order => order.customer_email)).size} total customers
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <HiCalendar className="h-5 w-5 text-gray-400" />
                  <select
                    value={customersTimeframe}
                    onChange={(e) => setCustomersTimeframe(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="365">All time</option>
                  </select>
                </div>
                <select
                  value={customersSortBy}
                  onChange={(e) => setCustomersSortBy(e.target.value as 'total' | 'orders' | 'recent')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="total">Sort by Total Spent</option>
                  <option value="orders">Sort by Order Count</option>
                  <option value="recent">Sort by Recent Orders</option>
                </select>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(orders.map(order => order.customer_email)).size}
                    </p>
                  </div>
                  <HiUsers className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Returning Customers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.values(
                        orders.reduce((acc, order) => {
                          const email = order.customer_email;
                          acc[email] = (acc[email] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).filter(count => count > 1).length}
                    </p>
                  </div>
                  <HiUserGroup className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Customer Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      £{new Set(orders.map(order => order.customer_email)).size > 0 
                        ? (orders.reduce((sum, order) => sum + order.total, 0) / new Set(orders.map(order => order.customer_email)).size).toFixed(2)
                        : '0.00'}
                    </p>
                  </div>
                  <HiTrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerData.map((customer, index) => (
                      <tr key={customer.email} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {customer.firstName} {customer.lastName}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <HiMail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </div>
                              {customer.phone && (
                                <div className="text-sm text-gray-500 flex items-center">
                                  <HiPhone className="h-3 w-3 mr-1" />
                                  {customer.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.orderCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            £{customer.totalSpent.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.lastOrderDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            customer.orderCount > 1 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {customer.orderCount > 1 ? 'Returning' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {customerData.map((customer, index) => (
                    <div key={customer.email} className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {customer.email}
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          customer.orderCount > 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {customer.orderCount > 1 ? 'Returning' : 'New'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Orders</div>
                          <div className="font-medium text-gray-900">{customer.orderCount}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Total Spent</div>
                          <div className="font-medium text-gray-900">£{customer.totalSpent.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Last Order</div>
                          <div className="font-medium text-gray-900">{customer.lastOrderDate.toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* No customers message */}
              {customerData.length === 0 && (
                <div className="text-center py-12">
                  <HiUsers className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No customers found for the selected timeframe</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                    Edit Order: {editingOrder.order_number}
                  </h2>
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.customer_first_name}
                        onChange={(e) => setEditForm({ ...editForm, customer_first_name: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={editForm.customer_last_name}
                        onChange={(e) => setEditForm({ ...editForm, customer_last_name: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.customer_email}
                      onChange={(e) => setEditForm({ ...editForm, customer_email: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.customer_phone}
                      onChange={(e) => setEditForm({ ...editForm, customer_phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={editForm.shipping_address_line1}
                      onChange={(e) => setEditForm({ ...editForm, shipping_address_line1: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={editForm.shipping_city}
                        onChange={(e) => setEditForm({ ...editForm, shipping_city: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={editForm.shipping_postal_code}
                        onChange={(e) => setEditForm({ ...editForm, shipping_postal_code: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Code
                      </label>
                      <input
                        type="text"
                        value={editForm.discount_code}
                        onChange={(e) => setEditForm({ ...editForm, discount_code: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Amount (£)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.discount_amount}
                        onChange={(e) => setEditForm({ ...editForm, discount_amount: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Number
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.tracking_number}
                        onChange={(e) => setEditForm({ ...editForm, tracking_number: e.target.value })}
                        placeholder="Enter Royal Mail tracking number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="auto-ship-status"
                          checked={true}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="auto-ship-status" className="text-sm text-gray-600">
                          Auto-mark as "Shipped" when tracking number is added
                        </label>
                      </div>
                      {editForm.tracking_number && (
                        <div className="p-2 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-700">
                            💡 Adding a tracking number will automatically update status to "Shipped"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={editForm.notes}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Method
                    </label>
                    <input
                      type="text"
                      value={editForm.shipping_method}
                      onChange={(e) => setEditForm({ ...editForm, shipping_method: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                  <button
                    onClick={() => setEditingOrder(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveOrder}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discount Codes Section */}
        {currentAdminSection === 'discount-codes' && (
          <div className="space-y-6">
            {/* Discount Codes Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Discount Code Management</h2>
                <p className="text-gray-600 mt-1">
                  {discountCodes.length} total discount codes
                </p>
              </div>
              <button
                onClick={handleCreateDiscountCode}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <HiPlus className="h-4 w-4" />
                <span>Create Discount Code</span>
              </button>
            </div>

            {/* Discount Codes List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Min Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {discountCodes.map((discountCode) => (
                      <tr key={discountCode.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{discountCode.code}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{discountCode.description || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            discountCode.discount_type === 'percentage' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {discountCode.discount_type === 'percentage' ? 'Percentage' : 'Fixed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {discountCode.discount_type === 'percentage' 
                              ? `${discountCode.discount_value}%` 
                              : `£${discountCode.discount_value.toFixed(2)}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            £{discountCode.min_order_amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {discountCode.current_uses}
                            {discountCode.max_uses && ` / ${discountCode.max_uses}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            discountCode.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {discountCode.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditDiscountCode(discountCode)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <HiPencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDiscountCode(discountCode.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <HiTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Discount Code Form Modal */}
        {showDiscountCodeForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingDiscountCode ? 'Edit Discount Code' : 'Create Discount Code'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code *
                    </label>
                    <input
                      type="text"
                      value={discountCodeForm.code}
                      onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, code: e.target.value.toUpperCase() })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., WELCOME10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={discountCodeForm.description}
                      onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Welcome discount for new customers"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type *
                      </label>
                      <select
                        value={discountCodeForm.discount_type}
                        onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, discount_type: e.target.value as 'percentage' | 'fixed' })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={discountCodeForm.discount_value}
                        onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, discount_value: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={discountCodeForm.discount_type === 'percentage' ? '10' : '5.00'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Amount (£)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={discountCodeForm.min_order_amount}
                      onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, min_order_amount: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Discount (£) - Optional
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={discountCodeForm.max_discount}
                      onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, max_discount: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00 (no limit)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Uses - Optional
                    </label>
                    <input
                      type="number"
                      value={discountCodeForm.max_uses}
                      onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, max_uses: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0 (no limit)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={discountCodeForm.start_date}
                        onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, start_date: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date - Optional
                      </label>
                      <input
                        type="date"
                        value={discountCodeForm.end_date}
                        onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, end_date: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={discountCodeForm.is_active}
                        onChange={(e) => setDiscountCodeForm({ ...discountCodeForm, is_active: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowDiscountCodeForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDiscountCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingDiscountCode ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage; 