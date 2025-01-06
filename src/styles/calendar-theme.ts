export const calendarTheme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    status: {
      completed: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        hover: 'hover:bg-green-100',
      },
      missed: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        hover: 'hover:bg-red-100',
      },
      pending: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        hover: 'hover:bg-yellow-100',
      },
    },
  },
  spacing: {
    calendar: {
      daySize: 'h-9 w-9',
      daySpacing: 'py-2',
      monthSpacing: 'mb-8',
      gridGap: 'gap-px',
    },
    airdrop: {
      card: 'px-4 py-3',
      spacing: 'space-y-2',
      gap: 'gap-4',
    },
  },
  typography: {
    title: 'text-xl font-semibold text-gray-900',
    subtitle: 'text-lg font-semibold text-gray-900',
    body: 'text-sm text-gray-500',
    caption: 'text-xs text-gray-400',
    status: 'text-xs font-medium',
  },
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.4,
    },
    spring: {
      gentle: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
      bouncy: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
  },
  borderRadius: {
    card: 'rounded-xl',
    badge: 'rounded-full',
    button: 'rounded-full',
  },
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const
