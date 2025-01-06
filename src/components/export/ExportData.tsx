import { useState } from 'react'
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

interface ExportDataProps {
  airdrops: Airdrop[]
}

export function ExportData({ airdrops }: ExportDataProps) {
  const [format, setFormat] = useState<'csv' | 'json'>('csv')

  const exportToCSV = () => {
    const headers = [
      'Title',
      'Description',
      'Status',
      'Deadline',
      'URL',
      'Reward Amount',
      'Reward Token',
      'Created At',
      'Completed At',
      'Notes',
    ]

    const rows = airdrops.map((airdrop) => [
      airdrop.title,
      airdrop.description || '',
      airdrop.status,
      airdrop.deadline || '',
      airdrop.url,
      airdrop.reward_amount?.toString() || '',
      airdrop.reward_token || '',
      airdrop.created_at,
      airdrop.completed_at || '',
      airdrop.notes || '',
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `airdrops_${new Date().toISOString()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    const jsonContent =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(airdrops, null, 2))

    const link = document.createElement('a')
    link.setAttribute('href', jsonContent)
    link.setAttribute('download', `airdrops_${new Date().toISOString()}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = () => {
    if (format === 'csv') {
      exportToCSV()
    } else {
      exportToJSON()
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>
      <button
        onClick={handleExport}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Export Data
      </button>
    </div>
  )
}
