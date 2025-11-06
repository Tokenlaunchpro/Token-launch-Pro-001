import { createClient } from '@supabase/supabase-js';
import { config } from './config.js';

// Initialize Supabase client
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

export default supabase;