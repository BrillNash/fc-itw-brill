import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiUrl } from '@/constants/constants'
import { toast } from 'vue-sonner'
import { useErrorBuilder } from '@/composables/useErrorBuilder'
import { SMError } from '@/types/error'

export const useTimezoneStore = defineStore('timezone', () => {
  const timezone = ref('')

  const getTimezone = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/timezone`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
      timezone.value = body.timezone
    } catch (e) {
      useErrorBuilder(e)
    }
  }

  const updateTimezone = async (updatedTimezone: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/timezone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timezone: updatedTimezone })
      })

      const body = await response.json()
      if (response.status !== 200) {
        throw new SMError(body)
      }
      timezone.value = body.timezone
      toast.success('Timezone updated successfully')
    } catch (e) {
      useErrorBuilder(e)
    }
  }

  return { 
    // State
    timezone, 
    
    // Methods
    getTimezone,
    updateTimezone, 
  }
})
