import express from 'express'
import { getTimezoneHandler, setTimezoneHandler } from '../controllers/TimezoneController'

const router = express.Router()

router.get('/', getTimezoneHandler)
router.post('/', setTimezoneHandler)

export default router
