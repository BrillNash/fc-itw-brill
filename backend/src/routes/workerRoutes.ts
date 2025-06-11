import express from 'express'
import { getWorkersHandler, createWorkerHandler, updateWorkerHandler, deleteWorkerHandler } from '../controllers/WorkerController'

const router = express.Router()

router.get('/', getWorkersHandler)
router.post('/',createWorkerHandler)
router.put('/:id',updateWorkerHandler)
router.delete('/:id',deleteWorkerHandler)

export default router
