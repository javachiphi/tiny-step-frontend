export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://diary-backend.fly.dev'
    : 'http://localhost:3001'

export const pages = [
  {
    title: 'Remind',
    href: '/remind',
  },
  {
    title: 'Reflect',
    href: '/reflect',
  },
  {
    title: '+ Add',
    href: '/create',
  },
]
