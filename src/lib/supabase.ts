import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://yclzqhvvbejrouknnilj.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbHpxaHZ2YmVqcm91a25uaWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2MzUwMDMsImV4cCI6MjEwODIxMTAwM30.IYmaDEYvmyPCyVaXYIOXGiyTFDxQkqR3xPTYGe95mAA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
