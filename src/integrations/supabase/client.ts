// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yzpkmbggleizktyszhvg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cGttYmdnbGVpemt0eXN6aHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDgyMDcsImV4cCI6MjA0OTQ4NDIwN30.VKyo1AThsrGiiHRN750Z72nXlGHIpuHAOA8Ap92t0m8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);