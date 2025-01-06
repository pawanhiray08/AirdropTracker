import { useState } from 'react'
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

interface AddAirdropFormProps {
  onSubmit: (airdrop: Omit<Airdrop, 'id' | 'created_at' | 'user_id'>) => Promise<void>
  onCancel: () => void
}

export function AddAirdropForm({ onSubmit, onCancel }: AddAirdropFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    url: '',
    reward_amount: '',
    reward_token: '',
    requirements: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit({
        ...formData,
        reward_amount: formData.reward_amount ? Number(formData.reward_amount) : null,
        requirements: formData.requirements ? JSON.parse(formData.requirements) : null,
        status: 'pending',
        completed_at: null,
        notes: null,
      })
      onCancel()
    } catch (error) {
      console.error('Error adding airdrop:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          type="datetime-local"
          id="deadline"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          type="url"
          id="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="reward_amount" className="block text-sm font-medium text-gray-700">
            Reward Amount
          </label>
          <input
            type="number"
            id="reward_amount"
            step="any"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.reward_amount}
            onChange={(e) => setFormData({ ...formData, reward_amount: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="reward_token" className="block text-sm font-medium text-gray-700">
            Reward Token
          </label>
          <input
            type="text"
            id="reward_token"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.reward_token}
            onChange={(e) => setFormData({ ...formData, reward_token: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          Requirements (JSON)
        </label>
        <textarea
          id="requirements"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder='{"twitter": true, "discord": false}'
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add Airdrop
        </button>
      </div>
    </form>
  )
}
