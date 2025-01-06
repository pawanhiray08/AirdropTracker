'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { classNames } from '@/lib/utils'
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

function colStartClasses(day: number): string {
  const cols: { [key: number]: string } = {
    0: 'col-start-7',
    1: 'col-start-1',
    2: 'col-start-2',
    3: 'col-start-3',
    4: 'col-start-4',
    5: 'col-start-5',
    6: 'col-start-6',
  }
  return cols[day] || ''
}

export default function AirdropCalendar({
  airdrops = [],
  onSelectDate,
}: {
  airdrops: Airdrop[]
  onSelectDate?: (date: Date) => void
}) {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  const selectedDayAirdrops = airdrops.filter((airdrop) =>
    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), selectedDay) : false
  )

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto text-xl font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 mt-8 text-xs leading-6 text-center text-gray-500">
              <div className="font-semibold">S</div>
              <div className="font-semibold">M</div>
              <div className="font-semibold">T</div>
              <div className="font-semibold">W</div>
              <div className="font-semibold">T</div>
              <div className="font-semibold">F</div>
              <div className="font-semibold">S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => {
                const hasAirdrop = airdrops.some((airdrop) =>
                  airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), day) : false
                )

                return (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 ? colStartClasses(getDay(day)) : '',
                      'py-2'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDay(day)
                        onSelectDate?.(day)
                      }}
                      className={classNames(
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-blue-600',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-900',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-400',
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'bg-blue-600',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-100',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                        hasAirdrop && !isEqual(day, selectedDay) && 'bg-blue-50 hover:bg-blue-100',
                        'mx-auto flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>
                    {hasAirdrop && !isEqual(day, selectedDay) && (
                      <div className="w-1 h-1 mx-auto mt-1">
                        <div className="w-1 h-1 rounded-full bg-blue-600"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900 text-lg">
              Airdrops for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-6 space-y-2 text-sm leading-6">
              {selectedDayAirdrops.length > 0 ? (
                selectedDayAirdrops.map((airdrop) => (
                  <li
                    key={airdrop.id}
                    className="group flex items-center space-x-4 rounded-xl px-4 py-3 focus-within:bg-gray-50 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-auto">
                      <p className="text-gray-900 font-medium">{airdrop.title}</p>
                      <p className="mt-0.5 text-gray-500">
                        {airdrop.deadline &&
                          format(parseISO(airdrop.deadline), 'h:mm a')}
                      </p>
                      {airdrop.description && (
                        <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                          {airdrop.description}
                        </p>
                      )}
                    </div>
                    <div
                      className={classNames(
                        airdrop.status === 'completed'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : airdrop.status === 'missed'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200',
                        'rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-200'
                      )}
                    >
                      {airdrop.status.charAt(0).toUpperCase() +
                        airdrop.status.slice(1)}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                  No airdrops scheduled for this day.
                </p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
