import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// Use placeholder URL for standalone mode (no actual Supabase connection)
// This prevents module initialization errors - actual calls will fail gracefully
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 1000,
      },
    },
  }
)

export type SupabaseClient = typeof supabase

export default supabase
