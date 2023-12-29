function formatDate(date) {
  if (isNaN(date)) {
    return 'Invalid Date'
  }

  const day = date.getDate()
  const options = { month: 'short' }
  const year = date.getFullYear()
  const formattedMonth = new Intl.DateTimeFormat('en-US', options).format(date)

  return `${formattedMonth} ${day}`
}

export function getDate(dateString) {
  const entryDate = new Date(dateString)
  return formatDate(entryDate)
}

export function getToday() {
  const today = new Date()
  return formatDate(today)
}
