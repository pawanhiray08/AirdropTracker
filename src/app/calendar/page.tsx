'use client'

import { Navbar } from '@/components/layout/Navbar'
import AirdropCalendar from '@/components/calendar/AirdropCalendar'
import { useAuth } from '@/hooks/useAuth'
import { useAirdrops } from '@/hooks/useAirdrops'

export default function CalendarPage() {
  const { user } = useAuth()
  const { airdrops, loading, error } = useAirdrops(user?.id)

  if (!user) {
    return (
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Please sign in to view the calendar.</p>
          </div>
        </main>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-red-600">Error loading airdrops.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AirdropCalendar airdrops={airdrops} />
      </main>
    </div>
  )
}
