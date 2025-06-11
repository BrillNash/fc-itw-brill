<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Worker</TableHead>
        <TableHead>Start Time</TableHead>
        <TableHead>End Time</TableHead>
        <TableHead>Duration (Hours)</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(shift, key) in shiftStore.shifts" :key="shift.id">
        <TableCell class="font-medium max-w-40 sm:max-w-64 text-ellipsis overflow-hidden">
          {{ workerStore.workers.find(worker => worker.id === shift.workerId)?.name }}
        </TableCell>
        <TableCell>{{ formatEpochInTimezone(shift.start) }}</TableCell>
        <TableCell>{{ formatEpochInTimezone(shift.end) }}</TableCell>
        <TableCell>{{ getDurationFromEpochSeconds(shift.start, shift.end) }}</TableCell>
        <TableCell>
          <div class="space-x-1">
            <Button 
              class="hover:bg-white bg-transparent shadow-none"
              @click="handleUpdate(shift.id)"
            >
              <SquarePen class="w-4 h-4 text-black"/>
            </Button>
            <Button 
              class="hover:bg-white bg-transparent shadow-none"
              @click="handleDelete(shift.id, shift.workerId)"
            >
              <Trash2 class="w-4 h-4 text-black"/>
            </Button>
          </div>
        </TableCell>

      </TableRow>
    </TableBody>
  </Table>
</template>

<script lang="ts" setup>
import { useShiftStore } from '@/stores/shift';
import { useWorkerStore } from '@/stores/worker';
import { formatEpochInTimezone } from '@/utils/epochToDateTime';
import { getDurationFromEpochSeconds } from '@/utils/getDurationFromEpochSeconds';

const shiftStore = useShiftStore()
const workerStore = useWorkerStore()

const handleDelete = async(shiftId: string, workerId: string) => {
  await shiftStore.deleteShift(shiftId, workerId)
}

const handleUpdate = async(id: string) => {
  shiftStore.isEditMode = true
  shiftStore.editShiftId = id
}

</script>