import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import timezoneRoutes from './routes/timezoneRoutes'
import workerRoutes from './routes/workerRoutes'
import shiftRoutes from './routes/shiftRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 8081

app.use(cors())
app.use(express.json())

app.use('/api/timezone', timezoneRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/shifts', shiftRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
