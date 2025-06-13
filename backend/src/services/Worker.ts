import { datastore } from '../config/datastore'
import { v4 as uuidv4 } from 'uuid'
import { WorkerError } from '../errors/workerError'

export const getAllWorkers = async () => {
  try {
    const query = datastore.createQuery('Worker')
    const [workers] = await datastore.runQuery(query)

    const result = workers.map((worker: any) => ({
      id: worker[datastore.KEY].name || worker[datastore.KEY].id,
      ...worker,
    }))

    return result
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: 'Error fetching workers',
      status: 400,
    })
  }
}

export const createWorker = async (name: string) => {
  const randomUUID = uuidv4()
  const createdAt = Date.now()

  const workerData = {
    name,
    created_at: createdAt,
  }

  try {
    const workerKey = datastore.key(['Worker', randomUUID])

    const entity = {
      key: workerKey,
      data: workerData,
    }

    await datastore.save({ key: workerKey, data: workerData })

    await datastore.save(entity)
    console.log('Worker created successfully:', entity)

    return {
      id: randomUUID,
      ...workerData,
    }
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: 'Error creating worker',
      status: 400,
    })
  }
}

export const updateWorkerName = async (workerId: string, newName: string) => {
  try {
    const workerKey = datastore.key(["Worker", workerId])
    const [worker] = await datastore.get(workerKey)

    if (!worker) {
      throw new Error(`Worker with ID ${workerId} not found.`)
    }

    worker.name = newName
    await datastore.update({ key: workerKey, data: worker })
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error updating worker name",
      status: 400,
    })
  }
}


export const deleteWorker = async (workerId: string) => {
  try {
    const workerKey = datastore.key(["Worker", workerId])

    const query = datastore
      .createQuery("Shift")
      .hasAncestor(workerKey)

    const [shifts] = await datastore.runQuery(query)

    const deleteShifts = shifts.map((shift) => ({
      method: "delete",
      key: shift[datastore.KEY],
    }))

    if (deleteShifts.length > 0) {
      await datastore.save(deleteShifts)
    }

    await datastore.delete(workerKey)
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error deleting worker",
      status: 400,
    })
  }
}
