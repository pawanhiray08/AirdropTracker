import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request) {
  try {
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const { data: airdrops, error } = await supabaseAdmin
      .from('airdrops')
      .select('*')
      .eq('status', 'pending')
      .lt('deadline', tomorrow.toISOString())
      .gt('deadline', now.toISOString())
      .order('deadline', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data: airdrops })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
