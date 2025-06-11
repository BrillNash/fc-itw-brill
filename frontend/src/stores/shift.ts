import type { Shift } from '@/types/types'

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiUrl } from '@/constants/constants'
import { convertKeysToCamelCase } from '@/utils/snakeToCamel'
import { getEpochSeconds } from '@/utils/getEpochSeconds'
import { toast } from 'vue-sonner'
import { useErrorBuilder } from '@/composables/useErrorBuilder'
import { SMError } from '@/types/error'

export const useShiftStore = defineStore('shifts', () => {
  const shifts = ref<Shift[]>([])
  const isEditMode = ref(false)
  const editShiftId = ref('')

  const getShifts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/shifts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status !== 200) {
        throw new Error(await response.text())
      }
      
      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
      
      const formattedShifts = body.map((shift: any) => {
        const convertedShift = convertKeysToCamelCase(shift)
        return {
          id: shift.id,
          workerId: convertedShift.workerId,
          start: shift.start.seconds,
          end: shift.end.seconds,
          createdAt: shift.createdAt
        }
      })
      shifts.value = formattedShifts
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  const addShift = async (workerId: string, start: string, end: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/shifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workerId: workerId, start: start, end: end })
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }

      shifts.value = [...shifts.value, convertKeysToCamelCase(body)]
      toast.success('Shift added successfully')
    } catch(e) {
      if(e) {
        useErrorBuilder(e)
      }
  }
  }

  const updateShift = async (id: string, currentWorkerId: string, updatedWorkerId: string, start: string, end: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/shifts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          shiftId: id,
          workerId: currentWorkerId,
          updates: {
            start: start,
            end: end,
            workerId: updatedWorkerId
          }
        })
      })
      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }

      shifts.value = shifts.value.map((shift) => {
        if (shift.id === id) {
          shift.workerId = updatedWorkerId
          shift.start = getEpochSeconds(start)
          shift.end = getEpochSeconds(end)
        }
        return shift
      })

    } catch(e) {
      useErrorBuilder(e)
    }
  }

  const deleteShift = async (shiftId: string, workerId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/shifts`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          shiftId: shiftId,
          workerId: workerId
        })
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
  
      shifts.value = shifts.value.filter((shift) => shift.id !== shiftId)
      toast.success('Shift deleted successfully')
    } catch(e) {
      useErrorBuilder(e)
    }
  }

  return { 
    // State
    shifts, 
    isEditMode,
    editShiftId,
    
    // Methods
    getShifts,
    addShift, 
    updateShift,
    deleteShift
  }
})
