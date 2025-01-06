import { useMemo } from 'react'
import { Database } from '@/types/supabase'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

interface DetailedStatsProps {
  airdrops: Airdrop[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function DetailedStats({ airdrops }: DetailedStatsProps) {
  const stats = useMemo(() => {
    // Monthly stats
    const monthlyData = airdrops.reduce((acc, airdrop) => {
      const month = new Date(airdrop.created_at).toLocaleString('default', {
        month: 'short',
        year: '2-digit',
      })
      acc[month] = acc[month] || { total: 0, completed: 0, missed: 0 }
      acc[month].total++
      if (airdrop.status === 'completed') acc[month].completed++
      if (airdrop.status === 'missed') acc[month].missed++
      return acc
    }, {} as Record<string, { total: number; completed: number; missed: number }>)

    // Token distribution
    const tokenDistribution = airdrops
      .filter((a) => a.status === 'completed' && a.reward_token)
      .reduce((acc, airdrop) => {
        const token = airdrop.reward_token || 'Unknown'
        acc[token] = (acc[token] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    // Success rate by day of week
    const dayStats = airdrops.reduce(
      (acc, airdrop) => {
        const day = new Date(airdrop.created_at).toLocaleString('default', {
          weekday: 'short',
        })
        acc.total[day] = (acc.total[day] || 0) + 1
        if (airdrop.status === 'completed') {
          acc.completed[day] = (acc.completed[day] || 0) + 1
        }
        return acc
      },
      { total: {}, completed: {} } as Record<string, Record<string, number>>
    )

    const successRateByDay = Object.keys(dayStats.total).map((day) => ({
      day,
      rate: (dayStats.completed[day] || 0) / dayStats.total[day] * 100,
    }))

    return {
      monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
        month,
        ...data,
      })),
      tokenDistribution: Object.entries(tokenDistribution).map(([name, value]) => ({
        name,
        value,
      })),
      successRateByDay,
    }
  }, [airdrops])

  return (
    <div className="space-y-8">
      {/* Monthly Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#00C49F" name="Completed" />
              <Bar dataKey="missed" fill="#FF8042" name="Missed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Token Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Token Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.tokenDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.tokenDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Success Rate by Day */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Success Rate by Day of Week
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.successRateByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="rate" fill="#0088FE" name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
