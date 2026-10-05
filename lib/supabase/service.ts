import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, supabaseSecretKey } from '@/lib/env';

let client: SupabaseClient | null = null;

/** Server-only client with the secret key. Bypasses RLS — only used by the ingestion routes. */
export function serviceClient(): SupabaseClient | null {
  const key = supabaseSecretKey();
  if (!SUPABASE_URL || !key) return null;
  client ??= createClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
