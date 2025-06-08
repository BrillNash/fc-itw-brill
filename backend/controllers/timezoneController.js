import { getTimezone, setTimezone } from '../models/timezoneModel.js'

export const getTimezoneHandler = (req, res) => res.json({ timezone: getTimezone() })

export const setTimezoneHandler = (req, res) => {
  setTimezone(req.body.timezone)
  res.json({ message: 'Timezone updated', timezone: getTimezone() })
}
