import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_MISC_USE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_MISC_USE_ANON_KEY

// Return null when Supabase credentials are not configured
// This allows pages to gracefully handle missing Supabase connection
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey) : null

export type SupabaseClient = typeof supabase

export default supabase
