'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Database } from '@/types/supabase'
import { useAuth } from '@/hooks/useAuth'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

export function NotificationBell() {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Airdrop[]>([])

  useEffect(() => {
    if (!user) return

    // Get upcoming deadlines (within next 24 hours)
    const fetchNotifications = async () => {
      const now = new Date()
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

      const { data } = await fetch('/api/notifications').then((res) => res.json())
      setNotifications(data || [])
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000) // Refresh every 5 minutes

    return () => clearInterval(interval)
  }, [user])

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            <div className="mt-2 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming deadlines</p>
              ) : (
                notifications.map((airdrop) => (
                  <div
                    key={airdrop.id}
                    className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {airdrop.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Deadline:{' '}
                        {airdrop.deadline
                          ? formatDistanceToNow(new Date(airdrop.deadline), {
                              addSuffix: true,
                            })
                          : 'No deadline'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
