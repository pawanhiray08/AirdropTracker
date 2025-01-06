'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { AirdropCard } from '@/components/airdrops/AirdropCard'
import { AddAirdropForm } from '@/components/airdrops/AddAirdropForm'
import { useAuth } from '@/hooks/useAuth'
import { useAirdrops } from '@/hooks/useAirdrops'

export default function AirdropsPage() {
  const { user } = useAuth()
  const { airdrops, loading, error, addAirdrop, updateAirdrop, deleteAirdrop } = useAirdrops(
    user?.id
  )
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'missed'>('all')

  const filteredAirdrops = airdrops.filter((airdrop) => {
    if (filter === 'all') return true
    return airdrop.status === filter
  })

  const handleStatusChange = async (id: string, status: 'pending' | 'completed' | 'missed') => {
    try {
      await updateAirdrop(id, {
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
      })
    } catch (error) {
      console.error('Error updating airdrop status:', error)
    }
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Please sign in to view your airdrops.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Your Airdrops</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add New Airdrop
            </button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2">
              {(['all', 'pending', 'completed', 'missed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filter === status
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Airdrop</h2>
                <AddAirdropForm
                  onSubmit={addAirdrop}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-600">Loading airdrops...</p>
          ) : error ? (
            <p className="text-center text-red-600">Error loading airdrops</p>
          ) : filteredAirdrops.length === 0 ? (
            <p className="text-center text-gray-600">No airdrops found</p>
          ) : (
            <div className="space-y-4">
              {filteredAirdrops.map((airdrop) => (
                <AirdropCard
                  key={airdrop.id}
                  airdrop={airdrop}
                  onStatusChange={handleStatusChange}
                  onDelete={deleteAirdrop}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
