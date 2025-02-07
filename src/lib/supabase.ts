
import { createClient } from '@supabase/supabase-js';

// Эти значения нужно заменить на реальные из вашего проекта Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
