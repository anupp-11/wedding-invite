/**
 * Supabase Browser Client
 * Used for client-side operations (auth, real-time, etc.)
 * Uses the anon key which is safe to expose to the browser
 */

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// Singleton instance
let supabaseClient: SupabaseClient | null = null;

// Create a singleton instance of the Supabase browser client
// Only creates the client in browser environment
export function createClient() {
  // Return existing instance if available
  if (supabaseClient) {
    return supabaseClient;
  }

  // Get environment variables with fallback for build time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Create and cache the client
  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  
  return supabaseClient;
}
