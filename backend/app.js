import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import timezoneRoutes from './routes/timezoneRoutes.js'
import workerRoutes from './routes/workerRoutes.js'
import shiftRoutes from './routes/shiftRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(json())

app.use('/timezone', timezoneRoutes)
app.use('/workers', workerRoutes)
app.use('/shifts', shiftRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
