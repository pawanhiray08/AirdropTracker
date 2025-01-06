import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://rnmkajsmpigtwroaflzm.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubWthanNtcGlndHdyb2FmbHptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjE1NzMwNiwiZXhwIjoyMDUxNzMzMzA2fQ.6cLCht25pOiLpbsttdPSUJt6VBBXJLcykZHlZJITgyw'

// Create Supabase client with service role key (for server-side usage)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
