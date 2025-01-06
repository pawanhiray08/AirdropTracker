'use client'

import { motion } from 'framer-motion'

export default function CalendarSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-white rounded-2xl shadow-sm animate-pulse">
      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          {/* Calendar Section */}
          <div className="pr-0 md:pr-14">
            <div className="flex items-center mb-8">
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
              <div className="flex space-x-2 ml-auto">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="font-semibold">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 mt-2 gap-px">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="py-2">
                  <div className="mx-auto h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Airdrops Section */}
          <div className="mt-12 md:mt-0 md:pl-14">
            <div className="sticky top-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 border border-gray-100"
                >
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-4 mb-3">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-16 w-full bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
