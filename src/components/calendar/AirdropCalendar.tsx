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

interface Airdrop {
  id: string
  title: string
  deadline: string
  status: string
}

interface AirdropCalendarProps {
  airdrops: Airdrop[]
  onSelectDate?: (date: Date) => void
}

export default function AirdropCalendar({
  airdrops = [],
  onSelectDate,
}: AirdropCalendarProps) {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const selectedDayAirdrops = airdrops.filter((airdrop) =>
    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), selectedDay) : false
  )

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => {
                const hasAirdrop = airdrops.some((airdrop) =>
                  isSameDay(parseISO(airdrop.deadline), day)
                )

                return (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 ? colStartClasses(getDay(day)) : '',
                      'py-1.5'
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
                          'text-red-500',
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
                          'bg-red-500',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                        hasAirdrop && !isEqual(day, selectedDay) && 'bg-blue-100',
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Airdrops for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayAirdrops.length > 0 ? (
                selectedDayAirdrops.map((airdrop) => (
                  <li
                    key={airdrop.id}
                    className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                  >
                    <div className="flex-auto">
                      <p className="text-gray-900">{airdrop.title}</p>
                      <p className="mt-0.5">
                        {airdrop.deadline &&
                          format(parseISO(airdrop.deadline), 'h:mm a')}
                      </p>
                    </div>
                    <div
                      className={classNames(
                        airdrop.status === 'completed'
                          ? 'bg-green-50 text-green-700'
                          : airdrop.status === 'missed'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-yellow-50 text-yellow-700',
                        'rounded-full px-2 py-1 text-xs font-medium'
                      )}
                    >
                      {airdrop.status.charAt(0).toUpperCase() +
                        airdrop.status.slice(1)}
                    </div>
                  </li>
                ))
              ) : (
                <p>No airdrops for this day.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
