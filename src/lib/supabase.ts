import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  category: string;
  surface: string;
  client: string;
  cover_image: string;
  images: string[];
  description: string;
  display_order: number;
  created_at: string;
};
