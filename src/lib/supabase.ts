
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://waiflwackfqzzktphkun.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error(
    'Missing Supabase anon key. Please add VITE_SUPABASE_ANON_KEY to your environment.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
