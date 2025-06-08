import express, { json } from 'express'
import cors from 'cors'
import { DateTime } from 'luxon';
import { Datastore } from '@google-cloud/datastore'

const app = express()
const port = process.env.PORT || 8080
const datastore = new Datastore()

app.use(cors())
app.use(json())

let timezone = 'Asia/Manila' // default

// Timezone GET/POST
app.get('/timezone', (req, res) => res.json({ timezone }))

app.post('/timezone', (req, res) => {
  timezone = req.body.timezone
  res.json({ message: 'Timezone updated', timezone })
});

// Workers CRUD
app.get('/workers', async (req, res) => {
  try {
    const [workers] = await datastore.runQuery(datastore.createQuery('Worker'))
    res.json(workers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workers' })
  }
});

app.post('/workers', async (req, res) => {
  try {
    const workerKey = datastore.key('Worker')
    await datastore.save({ key: workerKey, data: { name: req.body.name } })
    res.json({ message: 'Successfully created' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create worker' })
  }
});

// Shifts CRUD
app.post('/shifts', async (req, res) => {
  try {
    const { workerId, start, end } = req.body

    const startDate = DateTime.fromISO(start, { zone: timezone })
    const endDate = DateTime.fromISO(end, { zone: timezone })

    const duration = endDate.diff(startDate, 'hours').hours

    // Maximum shift hourse duration is 12 hours
    if (duration > 12 || duration <= 0) {
      return res.status(400).json({ error: 'Invalid shift duration' })
    }

    const query = datastore.createQuery('Shift').filter('workerId', '=', workerId)
    const [existingShifts] = await datastore.runQuery(query)

    const overlap = existingShifts.some(s => {
      const sStart = DateTime.fromISO(s.start)
      const sEnd = DateTime.fromISO(s.end)
      return (startDate < sEnd && endDate > sStart)
    });

    if (overlap) {
      return res.status(400).json({ error: 'Shift overlaps with existing' })
    }

    const shiftKey = datastore.key('Shift')
    await datastore.save({
      key: shiftKey,
      data: {
        workerId,
        start: startDate.toUTC().toISO(),
        end: endDate.toUTC().toISO(),
        duration,
      },
    })

    res.json({ message: 'Shift created' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shift' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
