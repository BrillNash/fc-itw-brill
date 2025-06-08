import datastore from '../config/datastore.js'

export const findShiftsByWorkerId = (workerId) =>
  datastore.runQuery(datastore.createQuery('Shift').filter('workerId', '=', workerId))

export const createShift = (workerId, start, end, duration) => {
  const key = datastore.key('Shift')
  return datastore.save({
    key,
    data: {
      workerId,
      start,
      end,
      duration,
    },
  })
}
