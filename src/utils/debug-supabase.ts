// Debug utility to check Supabase connection
import { supabase } from './supabase';

export const debugSupabase = async () => {
  console.log('🔍 Debugging Supabase Connection...');
  
  // Check environment variables
  console.log('Environment Variables:');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
  
  // Check if configured
  const isConfigured = import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co' && 
                      import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-anon-key';
  console.log('Is Supabase Configured:', isConfigured);
  
  if (!isConfigured) {
    console.error('❌ Supabase not configured - using placeholder values');
    return false;
  }
  
  // Test connection
  try {
    console.log('🔌 Testing Supabase connection...');
    const { data, error } = await supabase
      .from('orders')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connected successfully!');
    console.log('Orders table exists and is accessible');
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    return false;
  }
};

// Add this to window for easy access
(window as any).debugSupabase = debugSupabase; 