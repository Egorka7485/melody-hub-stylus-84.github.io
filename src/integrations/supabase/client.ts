// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://waiflwackfqzzktphkun.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhaWZsd2Fja2ZxenprdHBoa3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjQ4ODgsImV4cCI6MjA1NDUwMDg4OH0.JdlN4ykKp4_fCwNiUVFvmCwiIMguuKi2I9hPGL7HkWk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);