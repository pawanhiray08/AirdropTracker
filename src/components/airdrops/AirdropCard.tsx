import { Database } from '@/types/supabase'
import { formatDistanceToNow } from 'date-fns'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

interface AirdropCardProps {
  airdrop: Airdrop
  onStatusChange: (id: string, status: Airdrop['status']) => void
  onDelete: (id: string) => void
}

export function AirdropCard({ airdrop, onStatusChange, onDelete }: AirdropCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    missed: 'bg-red-100 text-red-800',
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{airdrop.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{airdrop.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[airdrop.status]
            }`}
          >
            {airdrop.status.charAt(0).toUpperCase() + airdrop.status.slice(1)}
          </span>
          <button
            onClick={() => onDelete(airdrop.id)}
            className="text-red-600 hover:text-red-800"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Reward</p>
          <p className="mt-1 text-sm text-gray-900">
            {airdrop.reward_amount} {airdrop.reward_token}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Deadline</p>
          <p className="mt-1 text-sm text-gray-900">
            {airdrop.deadline
              ? formatDistanceToNow(new Date(airdrop.deadline), {
                  addSuffix: true,
                })
              : 'No deadline'}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <a
          href={airdrop.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          View Airdrop →
        </a>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onStatusChange(airdrop.id, 'completed')}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
        >
          Mark Complete
        </button>
        <button
          onClick={() => onStatusChange(airdrop.id, 'missed')}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
        >
          Mark Missed
        </button>
      </div>
    </div>
  )
}
