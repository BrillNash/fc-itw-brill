import express from 'express'
import { createShiftHandler } from '../controllers/shiftController.js'

const router = express.Router()
router.post('/', createShiftHandler)

export default router
