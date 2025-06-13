import { datastore } from '../config/datastore'
import { ShiftError } from '../errors/shiftError'
import { v4 as uuidv4 } from 'uuid'

export const getShiftsByWorkerId = async (workerId: string) => {
  try {
    const workerKey = datastore.key(["Worker", workerId])

    const query = datastore
      .createQuery("Shift")
      .hasAncestor(workerKey)

    const [shifts] = await datastore.runQuery(query)

    return shifts.map((shift) => ({
      id: shift[datastore.KEY].name || shift[datastore.KEY].id,
      ...shift,
    }))
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Error fetching worker shifts",
      status: 500,
    })
  }
}

export const getAllShifts = async () => {
  try {
    const query = datastore.createQuery("Shift")

    const [shifts] = await datastore.runQuery(query)

    return shifts.map((shift) => ({
      id: shift[datastore.KEY].name || shift[datastore.KEY].id,
      ...shift,
    }))
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Error fetching all shifts",
      status: 500,
    })
  }
}

export const createShift = async (
  workerId: string,
  start: string,
  end: string,
  _duration: number
) => {
  try {
    const shiftId = uuidv4()
    const shiftKey = datastore.key(["Worker", workerId, "Shift", shiftId])

    const shiftEntity = {
      key: shiftKey,
      data: {
        worker_id: workerId,
        start: new Date(start),
        end: new Date(end),
        created_at: new Date(),
      },
    }

    await datastore.save(shiftEntity)

    return {
      id: shiftId,
      ...shiftEntity.data,
    }
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to create shift",
      status: 500,
    })
  }
}

export const updateShift = async (
  shiftId: string,
  currentWorkerId: string,
  updates: {
    start?: string
    end?: string
    workerId?: string
  }
) => {
  try {
    const currentKey = datastore.key(["Worker", currentWorkerId, "Shift", shiftId])

    // If workerId is not changing
    if (!updates.workerId || updates.workerId === currentWorkerId) {
      const [existing] = await datastore.get(currentKey)
      if (!existing) throw new Error("Shift not found")

      const updatePayload = {
        ...existing,
        updated_at: new Date(),
      }

      if (updates.start) updatePayload.start = new Date(updates.start)
      if (updates.end) updatePayload.end = new Date(updates.end)

      await datastore.update({
        key: currentKey,
        data: updatePayload,
      })

      return {
        id: shiftId,
        workerId: currentWorkerId,
        ...updatePayload,
      }
    }

    // WorkerId has changed — migrate shift
    const newWorkerId = updates.workerId
    const newKey = datastore.key(["Worker", newWorkerId, "Shift", shiftId])

    const [oldData] = await datastore.get(currentKey)
    if (!oldData) throw new Error("Original shift not found")

    const migratedData = {
      ...oldData,
      start: updates.start ? new Date(updates.start) : oldData.start,
      end: updates.end ? new Date(updates.end) : oldData.end,
      worker_id: newWorkerId,
      updated_at: new Date(),
    }

    // Save new and delete old
    await datastore.save({ key: newKey, data: migratedData })
    await datastore.delete(currentKey)

    return {
      id: shiftId,
      ...migratedData,
    }
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to update (or migrate) shift",
      status: 500,
    })
  }
}

export const deleteShift = async (shiftId: string, workerId: string) => {
  try {
    const shiftKey = datastore.key(["Worker", workerId, "Shift", shiftId])
    await datastore.delete(shiftKey)

    return { success: true, id: shiftId }
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to delete shift",
      status: 400,
    })
  }
}
