import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mglbdxdgndniiumoqqht.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbGJkeGRnbmRuaWl1bW9xcWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDk4NDUsImV4cCI6MjA1NjU4NTg0NX0.NniEHQfC_X_HSjgNLDN8KR8kV7Z_xck7gMrb1pMTHcg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
