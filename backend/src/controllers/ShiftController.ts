import { Request, Response } from 'express'
import { DateTime } from 'luxon'
import { getTimezone } from '../services/Timezone'
import { getShiftsByWorkerId, createShift, updateShift, deleteShift, getAllShifts } from '../services/Shift'
import { createShiftSchema, deleteShiftSchema, updateShiftSchema } from '../schemas/shiftSchema'
import { ShiftError } from '../errors/shiftError'

export const getShiftsHandler = async (_request: Request, response: Response) => {
  try {
    const shifts = await getAllShifts()
    response.json(shifts)
  } catch {
    response.status(500).json({ error: 'Failed to fetch shifts' })
  }
}

export const createShiftHandler = async (request: Request, response: Response) => {
  const validatedBody = createShiftSchema.safeParse(request.body)
  if (!validatedBody.success) {
    throw new ShiftError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    })
  }

  const { workerId, start, end } = validatedBody.data
  const timezone = getTimezone()

  const startDate = DateTime.fromISO(start, { zone: timezone })
  const endDate = DateTime.fromISO(end, { zone: timezone })

  const duration = endDate.diff(startDate, 'hours').hours

  if (duration > 12 || duration <= 0) {
    response.status(500).json({ error: 'Invalid shift duration' })
    return 
  }

  const existingShifts = await getShiftsByWorkerId(workerId)
  const overlap = existingShifts.some((s: any) => {
    const sStart = DateTime.fromSeconds(s.start.seconds)
    const sEnd = DateTime.fromSeconds(s.end.seconds)
    return startDate < sEnd && endDate > sStart
  })

  if (overlap) {
    response.status(500).json({ error: 'Shift overlaps with existing' })
    return 
  }

  const startISO = startDate.toUTC().toISO() || ''
  const endISO = endDate.toUTC().toISO() || ''
  const shift = await createShift(workerId, startISO, endISO, duration)
  response.json({...shift, start: DateTime.fromISO(startISO).toSeconds(), end: DateTime.fromISO(endISO).toSeconds()})
}

export const updateShiftHandler = async (request: Request, response: Response) => {
  const validatedBody = updateShiftSchema.safeParse(request.body)
  if (!validatedBody.success) {
    throw new ShiftError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    })
  }

  const { shiftId, workerId, updates } = validatedBody.data
  const timezone = getTimezone()

  const startDate = DateTime.fromISO(updates.start, { zone: timezone })
  const endDate = DateTime.fromISO(updates.end, { zone: timezone })

  const duration = endDate.diff(startDate, 'hours').hours

  if (duration > 12 || duration <= 0) {
    response.status(400).json({
      timestamp: new Date().toISOString(),
      status: 500,
      errorCode: 'INVALID_SHIFT_DURATION',
      message: 'Invalid shift duration',
      path: request.originalUrl, // or `req.url` depending on your framework
    })
    return 
  }

  const existingShifts = await getShiftsByWorkerId(shiftId)
  const overlap = existingShifts.some((s: any) => {
    const sStart = DateTime.fromSeconds(s.start.seconds)
    const sEnd = DateTime.fromSeconds(s.end.seconds)
    return startDate < sEnd && endDate > sStart
  })

  if (overlap) {
    response.status(400).json({
      timestamp: new Date().toISOString(),
      status: 500,
      errorCode: 'SHIFT_OVERLAP',
      message: 'Shift overlaps with existing',
      path: request.originalUrl, // or `req.url` depending on your framework
    })
    return 
  }

  const startISO = startDate.toUTC().toISO() || ''
  const endISO = endDate.toUTC().toISO() || ''
  const shift = await updateShift(shiftId, workerId, { start: startISO, end: endISO })
  response.json({...shift, start: DateTime.fromISO(startISO).toSeconds(), end: DateTime.fromISO(endISO).toSeconds()})
}
export const deleteShiftHandler = async (request: Request, response: Response) => {
  const validatedBody = deleteShiftSchema.safeParse(request.body)
  if (!validatedBody.success) {
    throw new ShiftError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    })
  }

  const { shiftId, workerId } = validatedBody.data

  await deleteShift(shiftId, workerId)

  response.status(200).json('Successfully deleted!')
}