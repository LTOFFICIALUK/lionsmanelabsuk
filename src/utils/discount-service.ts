import { supabase } from './supabase';
import { DiscountCode, DiscountCodeUsage } from '../types';

// Check if Supabase is properly configured
const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co' && 
                             import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-anon-key';

export const discountService = {
  // Get all discount codes
  async getAllDiscountCodes(): Promise<{ data: DiscountCode[] | null; error: any }> {
    if (!isSupabaseConfigured) {
      // Fallback to mock data for demo purposes
      const mockDiscountCodes: DiscountCode[] = [
        {
          id: 'mock-1',
          code: 'WELCOME10',
          description: 'Welcome discount - 10% off orders over £20',
          discount_type: 'percentage',
          discount_value: 10.00,
          min_order_amount: 20.00,
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
          discount_value: 5.00,
          min_order_amount: 30.00,
          max_uses: 50,
          current_uses: 12,
          start_date: new Date().toISOString(),
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      return { data: mockDiscountCodes, error: null };
    }

    return await supabase
      .from('discount_codes')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Get active discount codes
  async getActiveDiscountCodes(): Promise<{ data: DiscountCode[] | null; error: any }> {
    if (!isSupabaseConfigured) {
      const { data } = await this.getAllDiscountCodes();
      const activeCodes = data?.filter(code => code.is_active) || [];
      return { data: activeCodes, error: null };
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('is_active', true)
      .gte('start_date', now)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    // Filter out expired codes on the client side
    const activeCodes = data?.filter(code => 
      !code.end_date || new Date(code.end_date) >= new Date()
    ) || [];

    return { data: activeCodes, error: null };
  },

  // Validate and get discount code
  async validateDiscountCode(code: string, subtotal: number): Promise<{ data: DiscountCode | null; error: any }> {
    if (!isSupabaseConfigured) {
      // Fallback to mock validation
      const mockCodes = await this.getAllDiscountCodes();
      const discountCode = mockCodes.data?.find(dc => 
        dc.code.toLowerCase() === code.toLowerCase() && 
        dc.is_active &&
        subtotal >= dc.min_order_amount
      );
      return { data: discountCode || null, error: null };
    }

    // Get the discount code by code and active status
    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error) {
      return { data: null, error };
    }

    const now = new Date();

    // Check if discount code has started
    if (data.start_date && new Date(data.start_date) > now) {
      return { data: null, error: { message: 'Discount code has not started yet' } };
    }

    // Check if discount code has expired
    if (data.end_date && new Date(data.end_date) < now) {
      return { data: null, error: { message: 'Discount code has expired' } };
    }

    // Check if minimum order amount is met
    if (data.min_order_amount > subtotal) {
      return { data: null, error: { message: `Minimum order amount of £${data.min_order_amount.toFixed(2)} required` } };
    }

    // Check if max uses reached
    if (data.max_uses && data.current_uses >= data.max_uses) {
      return { data: null, error: { message: 'Discount code usage limit reached' } };
    }

    return { data, error: null };
  },

  // Calculate discount amount
  calculateDiscountAmount(discountCode: DiscountCode, subtotal: number): number {
    let discountAmount = 0;

    if (discountCode.discount_type === 'percentage') {
      discountAmount = (subtotal * discountCode.discount_value) / 100;
      if (discountCode.max_discount) {
        discountAmount = Math.min(discountAmount, discountCode.max_discount);
      }
    } else {
      discountAmount = Math.min(discountCode.discount_value, subtotal);
    }

    return Math.round(discountAmount * 100) / 100; // Round to 2 decimal places
  },

  // Create new discount code
  async createDiscountCode(discountData: Omit<DiscountCode, 'id' | 'created_at' | 'updated_at' | 'current_uses'>): Promise<{ data: DiscountCode | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }

    return await supabase
      .from('discount_codes')
      .insert([{
        ...discountData,
        current_uses: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
  },

  // Update discount code
  async updateDiscountCode(id: string, updates: Partial<DiscountCode>): Promise<{ data: DiscountCode | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }

    return await supabase
      .from('discount_codes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
  },

  // Delete discount code
  async deleteDiscountCode(id: string): Promise<{ error: any }> {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase not configured' } };
    }

    return await supabase
      .from('discount_codes')
      .delete()
      .eq('id', id);
  },

  // Record discount code usage
  async recordDiscountUsage(discountCodeId: string, orderId: string, customerEmail: string, discountAmount: number, orderTotal: number): Promise<{ data: DiscountCodeUsage | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }

    // First, increment the usage count
    const { error: incrementError } = await supabase.rpc('increment_discount_code_usage', {
      discount_code_id: discountCodeId
    });

    if (incrementError) {
      return { data: null, error: incrementError };
    }

    // Then record the usage details
    return await supabase
      .from('discount_code_usage')
      .insert([{
        discount_code_id: discountCodeId,
        order_id: orderId,
        customer_email: customerEmail,
        discount_amount: discountAmount,
        order_total: orderTotal,
        used_at: new Date().toISOString()
      }])
      .select()
      .single();
  },

  // Get discount code usage statistics
  async getDiscountCodeStats(discountCodeId: string): Promise<{ data: DiscountCodeUsage[] | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: [], error: null };
    }

    return await supabase
      .from('discount_code_usage')
      .select('*')
      .eq('discount_code_id', discountCodeId)
      .order('used_at', { ascending: false });
  },

  // Get all discount code usage
  async getAllDiscountCodeUsage(): Promise<{ data: DiscountCodeUsage[] | null; error: any }> {
    if (!isSupabaseConfigured) {
      return { data: [], error: null };
    }

    return await supabase
      .from('discount_code_usage')
      .select(`
        *,
        discount_codes (
          code,
          description
        )
      `)
      .order('used_at', { ascending: false });
  }
}; 