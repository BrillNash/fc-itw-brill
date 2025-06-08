import { DateTime } from 'luxon'
import { getTimezone } from '../models/timezoneModel.js'
import { findShiftsByWorkerId, createShift } from '../models/shiftModel.js'

export const createShiftHandler = async (req, res) => {
  try {
    const { workerId, start, end } = req.body
    const timezone = getTimezone()

    const startDate = DateTime.fromISO(start, { zone: timezone })
    const endDate = DateTime.fromISO(end, { zone: timezone })

    const duration = endDate.diff(startDate, 'hours').hours

    if (duration > 12 || duration <= 0) {
      return res.status(400).json({ error: 'Invalid shift duration' })
    }

    const [existingShifts] = await findShiftsByWorkerId(workerId)
    const overlap = existingShifts.some(s => {
      const sStart = DateTime.fromISO(s.start)
      const sEnd = DateTime.fromISO(s.end)
      return startDate < sEnd && endDate > sStart
    })

    if (overlap) {
      return res.status(400).json({ error: 'Shift overlaps with existing' })
    }

    await createShift(workerId, startDate.toUTC().toISO(), endDate.toUTC().toISO(), duration)
    res.json({ message: 'Shift created' })
  } catch {
    res.status(500).json({ error: 'Failed to create shift' })
  }
}
