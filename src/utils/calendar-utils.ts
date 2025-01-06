import { parseISO, differenceInDays, format, isSameDay } from 'date-fns'
import { Database } from '@/types/supabase'

type Airdrop = Database['public']['Tables']['airdrops']['Row']

export const getTimeUntilDeadline = (deadline: string | null, today: Date) => {
  if (!deadline) return null
  const daysUntil = differenceInDays(parseISO(deadline), today)
  if (daysUntil === 0) return 'Today'
  if (daysUntil < 0) return `${Math.abs(daysUntil)} days ago`
  return `${daysUntil} days left`
}

export const formatAirdropTime = (deadline: string) => {
  return format(parseISO(deadline), 'h:mm a')
}

export const getAirdropsForDay = (airdrops: Airdrop[], day: Date) => {
  return airdrops.filter((airdrop) =>
    airdrop.deadline ? isSameDay(parseISO(airdrop.deadline), day) : false
  )
}

export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Completed',
        color: 'bg-green-50 text-green-700 border-green-200',
        hoverColor: 'hover:bg-green-100',
      }
    case 'missed':
      return {
        label: 'Missed',
        color: 'bg-red-50 text-red-700 border-red-200',
        hoverColor: 'hover:bg-red-100',
      }
    default:
      return {
        label: 'Pending',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        hoverColor: 'hover:bg-yellow-100',
      }
  }
}

export const formatRequirements = (requirements: any) => {
  try {
    if (typeof requirements === 'string') {
      return JSON.parse(requirements)
    }
    return requirements
  } catch {
    return requirements
  }
}

export const colStartClasses: { [key: number]: string } = {
  0: 'col-start-7',
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
}

export const getMonthStatistics = (airdrops: Airdrop[]) => {
  return {
    total: airdrops.length,
    completed: airdrops.filter((a) => a.status === 'completed').length,
    missed: airdrops.filter((a) => a.status === 'missed').length,
    pending: airdrops.filter((a) => a.status === 'pending').length,
  }
}

export const sortAirdropsByDeadline = (airdrops: Airdrop[]) => {
  return [...airdrops].sort((a, b) => {
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return parseISO(a.deadline).getTime() - parseISO(b.deadline).getTime()
  })
}

export const groupAirdropsByStatus = (airdrops: Airdrop[]) => {
  return airdrops.reduce(
    (acc, airdrop) => {
      acc[airdrop.status].push(airdrop)
      return acc
    },
    { completed: [], missed: [], pending: [] } as Record<string, Airdrop[]>
  )
}
