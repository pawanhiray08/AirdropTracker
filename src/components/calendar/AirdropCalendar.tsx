import { useState } from 'react'
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
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface AirdropCalendarProps {
  airdrops: Airdrop[]
}

export function AirdropCalendar({ airdrops }: AirdropCalendarProps) {
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
    <div className="bg-white p-8 rounded-lg shadow">
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
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
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
              const dayAirdrops = airdrops.filter((airdrop) =>
                airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), day) : false
              )

              return (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-indigo-600',
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
                        'bg-indigo-600',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                  {dayAirdrops.length > 0 && (
                    <div className="w-1 h-1 mx-auto mt-1">
                      <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                    </div>
                  )}
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
  )
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
