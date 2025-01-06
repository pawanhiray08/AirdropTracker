import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Database } from '@/types/supabase'

export async function GET() {
  try {
    const { data: airdrops, error } = await supabaseAdmin
      .from('airdrops')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(airdrops)
  } catch (error) {
    console.error('Error fetching airdrops:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      deadline,
      url,
      requirements,
      reward_amount,
      reward_token,
      user_id,
    } = body

    const { data, error } = await supabaseAdmin
      .from('airdrops')
      .insert([
        {
          title,
          description,
          deadline,
          url,
          requirements,
          reward_amount,
          reward_token,
          user_id,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating airdrop:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
