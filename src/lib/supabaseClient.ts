import { createClient } from '@supabase/supabase-js';

// Supabase URL and Key provided by user
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  'https://wdezdoqnbvfvwnsuysfn.supabase.co';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  'sb_publishable_9HuDL813Pxf6--IR5Uyd9Q_qAh09p7R';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}
