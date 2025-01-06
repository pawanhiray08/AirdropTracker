import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

interface FilterOption {
  label: string
  value: string
}

interface SortOption {
  label: string
  value: string
}

interface AirdropFiltersProps {
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  rewardFilter: string
  onRewardFilterChange: (reward: string) => void
}

const statusOptions: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Missed', value: 'missed' },
]

const sortOptions: SortOption[] = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Deadline (Soonest)', value: 'deadline_asc' },
  { label: 'Deadline (Latest)', value: 'deadline_desc' },
  { label: 'Reward (Highest)', value: 'reward_desc' },
  { label: 'Reward (Lowest)', value: 'reward_asc' },
]

const rewardOptions: FilterOption[] = [
  { label: 'All Rewards', value: 'all' },
  { label: 'With Reward', value: 'with_reward' },
  { label: 'No Reward', value: 'no_reward' },
]

export function AirdropFilters({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  rewardFilter,
  onRewardFilterChange,
}: AirdropFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
      {/* Status Filter */}
      <div className="flex space-x-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusFilterChange(option.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              statusFilter === option.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <span>Sort By</span>
          <svg
            className="ml-2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => onSortChange(option.value)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } ${
                        sortBy === option.value ? 'text-indigo-600' : 'text-gray-700'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Reward Filter */}
      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <span>Rewards</span>
          <svg
            className="ml-2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {rewardOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => onRewardFilterChange(option.value)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } ${
                        rewardFilter === option.value ? 'text-indigo-600' : 'text-gray-700'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
