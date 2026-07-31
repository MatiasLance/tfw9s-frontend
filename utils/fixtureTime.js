export const fixtureTimeOptions = [
  { text: '8:00 AM', value: '08:00' },
  { text: '8:25 AM', value: '08:25' },
  { text: '8:50 AM', value: '08:50' },
  { text: '9:15 AM', value: '09:15' },
  { text: '9:40 AM', value: '09:40' },
  { text: '10:05 AM', value: '10:05' },
  { text: '10:30 AM', value: '10:30' },
  { text: '10:55 AM', value: '10:55' },
  { text: '11:20 AM', value: '11:20' },
  { text: '11:45 AM', value: '11:45' },
  { text: '12:10 PM', value: '12:10' },
  { text: '12:35 PM', value: '12:35' },
  { text: '1:00 PM', value: '13:00' },
  { text: '1:25 PM', value: '13:25' },
  { text: '1:50 PM', value: '13:50' },
  { text: '2:15 PM', value: '14:15' },
  { text: '2:40 PM', value: '14:40' },
  { text: '3:05 PM', value: '15:05' },
  { text: '3:30 PM', value: '15:30' },
  { text: '3:55 PM', value: '15:55' },
  { text: '4:20 PM', value: '16:20' },
  { text: '4:45 PM', value: '16:45' },
  { text: '5:10 PM', value: '17:10' },
  { text: '5:35 PM', value: '17:35' },
  { text: '6:00 PM', value: '18:00' },
  { text: '6:25 PM', value: '18:25' },
  { text: '6:50 PM', value: '18:50' },
  { text: '7:15 PM', value: '19:15' },
  { text: '7:40 PM', value: '19:40' },
  { text: '8:05 PM', value: '20:05' },
  { text: '8:30 PM', value: '20:30' },
  { text: '8:55 PM', value: '20:55' },
  { text: '9:20 PM', value: '21:20' },
  { text: '9:45 PM', value: '21:45' },
  { text: '10:00 PM', value: '22:00' },
]

export function normalizeFixtureTime(time) {
  if (typeof time !== 'string') return null

  const matched = time.trim().match(/^(\d{1,2}):([0-5]\d)(?::[0-5]\d)?$/)
  if (!matched) return null

  const hours = Number(matched[1])
  if (hours > 23) return null

  return `${String(hours).padStart(2, '0')}:${matched[2]}`
}

export function formatFixtureTime(time) {
  const normalized = normalizeFixtureTime(time)
  if (!normalized) return 'Unknown'

  const [hours, minutes] = normalized.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12

  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`
}
