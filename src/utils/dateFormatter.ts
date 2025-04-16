export const formatDate = (dateString = new Date()) => {
  const locale = navigator.language || 'en-EN'
  const date = new Date(dateString)

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}