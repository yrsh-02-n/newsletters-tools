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