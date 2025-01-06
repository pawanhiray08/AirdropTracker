import { Database } from '@/types/supabase'
import { useMemo } from 'react'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

interface AirdropStatsProps {
  airdrops: Airdrop[]
}

export function AirdropStats({ airdrops }: AirdropStatsProps) {
  const stats = useMemo(() => {
    const total = airdrops.length
    const completed = airdrops.filter((a) => a.status === 'completed').length
    const missed = airdrops.filter((a) => a.status === 'missed').length
    const pending = airdrops.filter((a) => a.status === 'pending').length

    const totalReward = airdrops
      .filter((a) => a.status === 'completed' && a.reward_amount)
      .reduce((sum, a) => sum + (a.reward_amount || 0), 0)

    const rewardsByToken = airdrops
      .filter((a) => a.status === 'completed' && a.reward_amount && a.reward_token)
      .reduce((acc, a) => {
        const token = a.reward_token || 'Unknown'
        acc[token] = (acc[token] || 0) + (a.reward_amount || 0)
        return acc
      }, {} as Record<string, number>)

    const completionRate = total > 0 ? (completed / total) * 100 : 0

    return {
      total,
      completed,
      missed,
      pending,
      totalReward,
      rewardsByToken,
      completionRate,
    }
  }, [airdrops])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Airdrop Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Airdrops</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Completed</p>
          <p className="text-2xl font-semibold text-green-900">{stats.completed}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600">Missed</p>
          <p className="text-2xl font-semibold text-red-900">{stats.missed}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-semibold text-yellow-900">{stats.pending}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Rate</h3>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${stats.completionRate}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            />
          </div>
          <p className="text-sm text-gray-600">{stats.completionRate.toFixed(1)}% Success Rate</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rewards by Token</h3>
        <div className="space-y-2">
          {Object.entries(stats.rewardsByToken).map(([token, amount]) => (
            <div key={token} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{token}</span>
              <span className="text-sm font-medium text-gray-900">{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
