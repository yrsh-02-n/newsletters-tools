export const formatDateTime = (date: Date = new Date(), showTime = true) => {
  const locale = navigator.language || 'en-EN'

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // AM/PM формат
  }

  const formattedDate = date.toLocaleDateString(locale, dateOptions)
  const formattedTime = showTime
    ? date.toLocaleTimeString(locale, timeOptions)
    : ''

  return `${formattedDate} ${formattedTime}`.trim()
}

export function formatForGoogleCalendar(date?: Date | null): string {
  if (!date) return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${year}${month}${day}T${hours}${minutes}00`
}


