import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: airdrop, error } = await supabaseAdmin
      .from('airdrops')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    return NextResponse.json(airdrop)
  } catch (error) {
    console.error('Error fetching airdrop:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { data: airdrop, error } = await supabaseAdmin
      .from('airdrops')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(airdrop)
  } catch (error) {
    console.error('Error updating airdrop:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('airdrops')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting airdrop:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
