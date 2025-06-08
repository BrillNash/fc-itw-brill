import { getAllWorkers, createWorker } from '../models/workerModel.js'

export const getWorkersHandler = async (req, res) => {
  try {
    const [workers] = await getAllWorkers()
    res.json(workers)
  } catch {
    res.status(500).json({ error: 'Failed to fetch workers' })
  }
}

export const createWorkerHandler = async (req, res) => {
  try {
    const worker = await createWorker(req.body.name)
    res.status(201).json(worker)
  } catch {
    res.status(500).json({ error: 'Failed to create worker' })
  }
}
