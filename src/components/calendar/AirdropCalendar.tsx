'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
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
  differenceInDays,
} from 'date-fns'
import { classNames } from '@/lib/utils'
import { Database } from '@/types/supabase'
import { motion, AnimatePresence } from 'framer-motion'

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon className="h-4 w-4" />
    case 'missed':
      return <XCircleIcon className="h-4 w-4" />
    default:
      return <ExclamationCircleIcon className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-50 text-green-700 border-green-200'
    case 'missed':
      return 'bg-red-50 text-red-700 border-red-200'
    default:
      return 'bg-yellow-50 text-yellow-700 border-yellow-200'
  }
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
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [expandedAirdrop, setExpandedAirdrop] = useState<string | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  const selectedDayAirdrops = airdrops.filter((airdrop) =>
    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), selectedDay) : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function previousMonth() {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const toggleAirdropExpansion = (id: string) => {
    setExpandedAirdrop(expandedAirdrop === id ? null : id)
  }

  const getTimeUntilDeadline = (deadline: string | null) => {
    if (!deadline) return null
    const daysUntil = differenceInDays(parseISO(deadline), today)
    if (daysUntil === 0) return 'Today'
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days ago`
    return `${daysUntil} days left`
  }

  return (
    <div className="p-4 md:p-8 bg-white rounded-2xl shadow-sm">
      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="pr-0 md:pr-14">
            <div className="flex items-center mb-8">
              <motion.h2
                key={currentMonth}
                initial={{ y: direction * 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -direction * 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-auto text-xl font-semibold text-gray-900"
              >
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </motion.h2>
              <div className="flex space-x-2">
                <motion.button
                  type="button"
                  onClick={previousMonth}
                  disabled={isAnimating}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={nextMonth}
                  disabled={isAnimating}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500">
              <div className="font-semibold">S</div>
              <div className="font-semibold">M</div>
              <div className="font-semibold">T</div>
              <div className="font-semibold">W</div>
              <div className="font-semibold">T</div>
              <div className="font-semibold">F</div>
              <div className="font-semibold">S</div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth}
                initial={{ x: direction * 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 mt-2 text-sm"
              >
                {days.map((day, dayIdx) => {
                  const hasAirdrop = airdrops.some((airdrop) =>
                    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), day) : false
                  )
                  const dayAirdrops = airdrops.filter((airdrop) =>
                    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), day) : false
                  )

                  return (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 ? colStartClasses(getDay(day)) : '',
                        'py-2 relative group'
                      )}
                    >
                      <motion.button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day)
                          onSelectDate?.(day)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
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
                          hasAirdrop &&
                            !isEqual(day, selectedDay) &&
                            'bg-blue-50 hover:bg-blue-100',
                          'mx-auto flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200'
                        )}
                      >
                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                          {format(day, 'd')}
                        </time>
                      </motion.button>
                      {hasAirdrop && !isEqual(day, selectedDay) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1 h-1 mx-auto mt-1"
                        >
                          <div className="w-1 h-1 rounded-full bg-blue-600"></div>
                        </motion.div>
                      )}
                      {hasAirdrop && !isMobileView && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-10">
                          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {dayAirdrops.length} airdrop{dayAirdrops.length !== 1 ? 's' : ''}
                          </div>
                          <div className="border-t-4 border-transparent border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-gray-900 w-0 h-0 absolute left-1/2 -translate-x-1/2"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <div className="sticky top-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 z-10">
              <motion.h2
                layout
                className="font-semibold text-gray-900 text-lg flex items-center gap-2"
              >
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>
                  Airdrops for{' '}
                  <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                    {format(selectedDay, 'MMM dd, yyy')}
                  </time>
                </span>
              </motion.h2>
            </div>
            <motion.div
              layout
              className="space-y-2 text-sm leading-6 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 custom-scrollbar"
            >
              <AnimatePresence mode="wait">
                {selectedDayAirdrops.length > 0 ? (
                  <motion.ol className="space-y-2">
                    {selectedDayAirdrops.map((airdrop) => (
                      <motion.li
                        key={airdrop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="group rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                      >
                        <div className="flex-auto">
                          <div className="flex items-center justify-between">
                            <p className="text-gray-900 font-medium">{airdrop.title}</p>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleAirdropExpansion(airdrop.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              {expandedAirdrop === airdrop.id ? (
                                <ChevronUpIcon className="h-5 w-5" />
                              ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                              )}
                            </motion.button>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-gray-500 flex-wrap">
                            {airdrop.deadline && (
                              <span className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                {format(parseISO(airdrop.deadline), 'h:mm a')}
                              </span>
                            )}
                            {airdrop.url && (
                              <span className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                <a
                                  href={airdrop.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                  View Link
                                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                                </a>
                              </span>
                            )}
                            {airdrop.deadline && (
                              <span className="text-sm text-gray-500">
                                {getTimeUntilDeadline(airdrop.deadline)}
                              </span>
                            )}
                          </div>
                          <AnimatePresence>
                            {(expandedAirdrop === airdrop.id || !isMobileView) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {airdrop.description && (
                                  <p className="mt-2 text-gray-500 text-sm">
                                    {airdrop.description}
                                  </p>
                                )}
                                {airdrop.requirements && (
                                  <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      Requirements:
                                    </h4>
                                    <pre className="mt-1 text-sm text-gray-500 whitespace-pre-wrap">
                                      {JSON.stringify(airdrop.requirements, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                {airdrop.notes && (
                                  <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      Notes:
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {airdrop.notes}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={classNames(
                              getStatusColor(airdrop.status),
                              'rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-200 flex items-center gap-1'
                            )}
                          >
                            {getStatusIcon(airdrop.status)}
                            <span>
                              {airdrop.status.charAt(0).toUpperCase() +
                                airdrop.status.slice(1)}
                            </span>
                          </motion.div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ol>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg"
                  >
                    No airdrops scheduled for this day.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  )
}
