import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Worker } from '@/types/types'
import { apiUrl } from '@/constants/constants'
import { useShiftStore } from './shift'
import { toast } from 'vue-sonner'
import { useErrorBuilder } from '@/composables/useErrorBuilder'
import { SMError } from '@/types/error'

export const useWorkerStore = defineStore('workers', () => {
  const shiftStore = useShiftStore()

  const workers = ref<Worker[]>([])

  const getWorkers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/workers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
      
      workers.value = body
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  const addWorker = async (name: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/workers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      })
      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }

      workers.value = [...workers.value, body]
      toast.success('Worker added successfully')
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  const updateWorker = async (id: string, name: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/workers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
  
      workers.value = workers.value.map((worker) => {
        if (worker.id === id) {
          worker.name = name
        }
        return worker
      })
      toast.success('Worker updated successfully')
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  const deleteWorker = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/workers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
  
      workers.value = workers.value.filter((worker) => worker.id !== id)
      shiftStore.shifts = shiftStore.shifts.filter((shift) => shift.workerId !== id)
      toast.success('Worker deleted successfully')
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  return { 
    // State
    workers, 
    
    // Methods
    getWorkers,
    addWorker, 
    updateWorker,
    deleteWorker
  }
})
