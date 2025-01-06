import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://rnmkajsmpigtwroaflzm.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseServiceKey) {
  throw new Error('Missing env.SUPABASE_SERVICE_KEY')
}

// Create Supabase client with service role key (only use server-side)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)
