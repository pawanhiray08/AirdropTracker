import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://rnmkajsmpigtwroaflzm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubWthanNtcGlndHdyb2FmbHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTczMDYsImV4cCI6MjA1MTczMzMwNn0.0yf14Zr0zKc0pzszhMVTo1MzrlEKkxOdXGj6zOXOCsk'

// Create Supabase client (for client-side usage)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
