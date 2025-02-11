
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://waiflwackfqzzktphkun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhaWZsd2Fja2ZxenprdHBoa3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjQ4ODgsImV4cCI6MjA1NDUwMDg4OH0.JdlN4ykKp4_fCwNiUVFvmCwiIMguuKi2I9hPGL7HkWk';

export const supabase = createClient(supabaseUrl, supabaseKey);
