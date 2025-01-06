import { Navbar } from '@/components/layout/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Track Your Crypto Airdrops
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Never miss an airdrop again. Track, manage, and optimize your crypto airdrop
              opportunities in one place.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Track Opportunities
                </h3>
                <p className="text-gray-600">
                  Keep track of all your airdrop opportunities in one organized dashboard.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Never Miss Deadlines
                </h3>
                <p className="text-gray-600">
                  Get notifications for upcoming deadlines and important updates.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analytics & Insights
                </h3>
                <p className="text-gray-600">
                  View statistics and insights about your airdrop performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
