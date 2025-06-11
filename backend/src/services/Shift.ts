import { getDocs, collection, doc, setDoc, updateDoc, deleteDoc, collectionGroup, getDoc } from 'firebase/firestore'
import { db } from '../config/datastore'
import { ShiftError } from '../errors/shiftError'
import { v4 as uuidv4 } from 'uuid'

export const getShiftsByWorkerId = async (workerId: string) => {
  try {
    const shiftsCollectionRef = collection(db, "workers", workerId, "shifts")
    const querySnapshot = await getDocs(shiftsCollectionRef)

    if (querySnapshot.empty) {
      return []
    }

    const shifts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return shifts
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Error fetching worker shifts",
      status: 400,
    })
  }
}

export const getAllShifts = async () => {
  try {
    // Searches all subcollections named "shifts" regardless of parent
    const querySnapshot = await getDocs(collectionGroup(db, "shifts"))

    const shifts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return shifts
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Error fetching all shifts",
      status: 400,
    })
  }
}

export const createShift = async (workerId: string, start: string, end: string, _duration: number) => {
  try {
    const randomUUID = uuidv4()
    const shiftDoc = {
      worker_id: workerId,
      start: new Date(start),
      end: new Date(end),
      created_at: Date.now(),
    }

    // Store under: workers/{workerId}/shifts/{shiftId}
    const docRef = doc(collection(db, "workers", workerId, "shifts"), randomUUID)
    await setDoc(docRef, shiftDoc)

    return {
      id: docRef.id,
      ...shiftDoc,
    }
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to create shift",
      status: 400,
    })
  }
}

export const updateShift = async (
  shiftId: string,
  currentWorkerId: string,
  updates: {
    start?: string
    end?: string
    workerId?: string // Optional new workerId
  }
) => {
  try {
    const oldDocRef = doc(db, "workers", currentWorkerId, "shifts", shiftId);

    // If no workerId change, just update in place
    if (!updates.workerId || updates.workerId === currentWorkerId) {
      const updatePayload: Record<string, any> = {
        updated_at: Date.now(),
      };

      if (updates.start) updatePayload.start = new Date(updates.start);
      if (updates.end) updatePayload.end = new Date(updates.end);

      await updateDoc(oldDocRef, updatePayload);

      return {
        id: shiftId,
        workerId: currentWorkerId,
        ...updatePayload,
      };
    }

    // WorkerId has changed — migrate the shift
    const newWorkerId = updates.workerId;
    const newDocRef = doc(db, "workers", newWorkerId, "shifts", shiftId);

    const oldDocSnap = await getDoc(oldDocRef);
    if (!oldDocSnap.exists()) {
      throw new Error("Original shift not found");
    }

    const oldData = oldDocSnap.data();

    const migratedData = {
      ...oldData,
      start: updates.start ? new Date(updates.start) : oldData.start,
      end: updates.end ? new Date(updates.end) : oldData.end,
      worker_id: newWorkerId,
      updated_at: Date.now(),
    };

    await setDoc(newDocRef, migratedData);
    await deleteDoc(oldDocRef);

    return {
      id: shiftId,
      ...migratedData,
    };
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to update (or migrate) shift",
      status: 400,
    });
  }
}

export const deleteShift = async (
  shiftId: string,
  workerId: string
) => {
  try {
    const docRef = doc(db, "workers", workerId, "shifts", shiftId)
    await deleteDoc(docRef)

    return { success: true, id: shiftId }
  } catch (e: any) {
    throw new ShiftError({
      error: e,
      message: "Failed to delete shift",
      status: 400,
    })
  }
}
