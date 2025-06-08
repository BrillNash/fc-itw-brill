import datastore from '../config/datastore.js'

export const getAllWorkers = () => datastore.runQuery(datastore.createQuery('Worker'))

export const createWorker = (name) => {
  const key = datastore.key('Worker')
  return datastore
    .save({ key, data: { name } })
    .then(() => ({ id: key.id || key.name, name }))
}
