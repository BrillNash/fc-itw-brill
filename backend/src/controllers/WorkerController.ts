import { Request, Response } from 'express'
import { getAllWorkers, createWorker, updateWorkerName, deleteWorker } from '../services/Worker'
import { workerSchema } from '../schemas/workerSchema'
import { WorkerError } from '../errors/workerError'

export const getWorkersHandler = async (_request: Request, response: Response) => {
  const workers = await getAllWorkers()
  response.json(workers)
}

export const createWorkerHandler = async (request: Request, response: Response) => {
  const validatedBody = workerSchema.safeParse(request.body)

  if (!validatedBody.success) {
    throw new WorkerError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    })
  }

  const { name } = validatedBody.data

  const worker = await createWorker(name)

  response.status(200).json(worker)
}

export const updateWorkerHandler = async (request: Request, response: Response) => {
  const validatedBody = workerSchema.safeParse(request.body)
  const params = request.params

  if (!validatedBody.success) {
    throw new WorkerError({
      error: validatedBody.error.flatten(),
      message: "Validation failed",
      status: 400,
    })
  }

  const { name } = validatedBody.data

  await updateWorkerName(params.id, name)

  response.status(200).json('Successfully updated worker')
}

export const deleteWorkerHandler = async (request: Request, response: Response) => {
  const params = request.params

  await deleteWorker(params.id)

  response.status(200).json('Successfully deleted!')
}
