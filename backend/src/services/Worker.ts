import { db } from '../config/datastore'
import { v4 as uuidv4 } from 'uuid'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore" 
import { WorkerError } from '../errors/workerError'

export const getAllWorkers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "workers"))
    const workers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return workers
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error fetching workers",
      status: 400,
    })
  }
}

export const createWorker = async (name: string) => {
  const randomUUID = uuidv4()
  const createdAt = Date.now()

  const worker = {
    id: randomUUID,
    name,
    created_at: createdAt,
  }

  try {
    const docRef = doc(db, "workers", randomUUID)
    await setDoc(docRef, worker)

    return worker
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error creating worker",
      status: 400,
    })
  }
}

export const updateWorkerName = async (workerId: string, newName: string) => {
  try {
    const docRef = doc(db, "workers", workerId)
    await updateDoc(docRef, {
      name: newName,
    })
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error updating worker name",
      status: 400,
    })
  }
}

export const deleteWorker = async (workerId: string) => {
  try {
    const shiftsCollection = collection(db, "workers", workerId, "shifts")
    const shiftsSnapshot = await getDocs(shiftsCollection)

    const deleteShiftPromises = shiftsSnapshot.docs.map((shiftDoc) =>
      deleteDoc(shiftDoc.ref)
    )
    await Promise.all(deleteShiftPromises)

    await deleteDoc(doc(db, "workers", workerId))
  } catch (e: any) {
    throw new WorkerError({
      error: e,
      message: "Error deleting worker",
      status: 400,
    })
  }
}


