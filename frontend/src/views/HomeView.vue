<template>
  <main class="bg-gradient-to-br from-blue-50 via-red-50 to-yellow-50 min-h-screen p-6">
    <Toaster rich-colors/>

    <div class="container mx-auto max-w-7xl space-y-6">
      <HomeTitle title="Shift Management System" class="text-center"/>
      <HomeDescription/>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TimezoneSection class="col-span-1"/>
        <WorkersSection class="col-span-1 lg:col-span-3" />
      </div>
      <ShiftsSection class="w-full"/>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import TimezoneSection from '../components/TimezoneSection/index.vue'
import WorkersSection from '../components/WorkersSection/index.vue'
import ShiftsSection from '../components/ShiftsSection/index.vue'
import HomeTitle from '../components/common/HomeTitle.vue'
import HomeDescription from '@/components/common/HomeDescription.vue'
import { useWorkerStore } from '@/stores/worker'
import { useTimezoneStore } from '@/stores/timezone'
import 'vue-sonner/style.css'
import { useShiftStore } from '@/stores/shift'

const workerStore = useWorkerStore()
const timezoneStore = useTimezoneStore()
const shiftStore = useShiftStore()

const setSessionCookie = () => {
  const sessionCookie = document.cookie
    .split(' ')
    .find(row => row.startsWith('session='))
  if (sessionCookie) {
    const sessionValue = sessionCookie.split('=')[1]
    localStorage.setItem('session', sessionValue)
  }
}

const fetchWorkers = async() => {
  await workerStore.getWorkers()
}
const fetchTimezone = async() => {
  await timezoneStore.getTimezone()
}

const fetchShifts = async() => {
  await shiftStore.getShifts()
}

onBeforeMount(() => {
  setSessionCookie()
  fetchWorkers()
  fetchTimezone()
  fetchShifts()
})
</script>
