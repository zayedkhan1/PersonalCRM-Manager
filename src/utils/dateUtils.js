import { format, isPast, isToday, parseISO } from 'date-fns'

export function formatDate(dateStr) {
  if (!dateStr) return '-'
  try {
    return format(parseISO(dateStr), 'yyyy-MM-dd')
  } catch {
    return dateStr
  }
}

export function isOverdue(dateStr) {
  if (!dateStr) return false
  try {
    const date = parseISO(dateStr)
    return isPast(date) && !isToday(date)
  } catch {
    return false
  }
}

export function isUpcoming(dateStr) {
  if (!dateStr) return false
  try {
    const date = parseISO(dateStr)
    return isToday(date)
  } catch {
    return false
  }
}
