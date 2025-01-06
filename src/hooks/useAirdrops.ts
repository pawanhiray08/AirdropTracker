import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

export function useAirdrops(userId: string | undefined) {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchAirdrops = async () => {
      try {
        const { data, error } = await supabase
          .from('airdrops')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error

        setAirdrops(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch airdrops'))
      } finally {
        setLoading(false)
      }
    }

    fetchAirdrops()

    // Set up real-time subscription
    const subscription = supabase
      .channel('airdrops_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'airdrops',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAirdrops((current) => [payload.new as Airdrop, ...current])
          } else if (payload.eventType === 'UPDATE') {
            setAirdrops((current) =>
              current.map((airdrop) =>
                airdrop.id === payload.new.id ? (payload.new as Airdrop) : airdrop
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setAirdrops((current) =>
              current.filter((airdrop) => airdrop.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const addAirdrop = async (airdrop: Omit<Airdrop, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .insert([{ ...airdrop, user_id: userId }])
        .select()
        .single()

      if (error) throw error

      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add airdrop')
    }
  }

  const updateAirdrop = async (id: string, updates: Partial<Airdrop>) => {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update airdrop')
    }
  }

  const deleteAirdrop = async (id: string) => {
    try {
      const { error } = await supabase.from('airdrops').delete().eq('id', id)
      if (error) throw error
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete airdrop')
    }
  }

  return {
    airdrops,
    loading,
    error,
    addAirdrop,
    updateAirdrop,
    deleteAirdrop,
  }
}
