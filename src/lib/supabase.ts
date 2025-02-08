
import { createClient } from '@supabase/supabase-js';

// Эти значения нужно заменить на реальные из вашего проекта Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
