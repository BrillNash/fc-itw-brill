<template>
  <section>
    <Card class="w-full rounded-lg border">
      <CardHeader class="flex justify-between">
        <CardTitle>Shifts Management</CardTitle>
          <Button 
            v-if="shiftStore.isEditMode"
            @click="toggleEdit"
          >
            Cancel
          </Button>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <ShiftForm/>
        <ShiftTable/>
      </CardContent>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import { useShiftStore } from '@/stores/shift';
import ShiftForm from './ShiftForm.vue';
import ShiftTable from './ShiftTable.vue';

const shiftStore = useShiftStore()

const toggleEdit = () => {
  shiftStore.isEditMode = false
  shiftStore.editShiftId = ''
}
</script>