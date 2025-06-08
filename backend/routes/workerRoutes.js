import express from 'express'
import { getWorkersHandler, createWorkerHandler } from '../controllers/workerController.js'

const router = express.Router()
router.get('/', getWorkersHandler)
router.post('/', createWorkerHandler)

export default router
