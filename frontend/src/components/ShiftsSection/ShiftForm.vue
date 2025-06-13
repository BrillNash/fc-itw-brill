lea<template>
  <Card class="w-full rounded-lg border">
    <CardHeader>
      <CardTitle>Add new shift</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField v-slot="{ componentField }" name="workerId" class="col-span-1">
          <FormItem>
            <FormLabel>Worker</FormLabel>
            <FormControl>
              <WorkerSelect v-bind="componentField"/>
            </FormControl>

            <!-- Optional: Add form error message -->
            <!-- <FormMessage />  -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="startDate" class="col-span-1">
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" class="border rounded-sm px-4 py-2" v-bind="componentField"/>
            </FormControl>

            <!-- Optional: Add form error message -->
            <!-- <FormMessage />  -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="startTime" class="col-span-1">
          <FormItem>
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input placeholder="Select worker" type="time" class="border rounded-sm px-4 py-2" v-bind="componentField"/>
            </FormControl>

            <!-- Optional: Add form error message -->
            <!-- <FormMessage />  -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="endDate" class="col-span-1">
          <FormItem>
            <FormLabel>End Date</FormLabel>
            <FormControl>
              <Input type="date" class="border rounded-sm px-4 py-2" v-bind="componentField"/>
            </FormControl>

            <!-- Optional: Add form error message -->
            <!-- <FormMessage />  -->
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="endTime" class="col-span-1">
          <FormItem>
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input placeholder="Select worker" type="time" class="border rounded-sm px-4 py-2" v-bind="componentField"/>
            </FormControl>

            <!-- Optional: Add form error message -->
            <!-- <FormMessage />  -->
          </FormItem>
        </FormField>

        <Button 
          v-if="!shiftStore.isEditMode"
          type="submit" 
          class="self-end py-2 px-4 rounded-sm"
        >
          <Plus />
          Add Shift
        </Button>
        <Button 
          v-else
          type="button" 
          class="self-end py-2 px-4"
          @click="handleUpdate"
        >
          <Pencil />
          Update Shift
        </Button>
      </form>

    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import WorkerSelect from '../common/WorkerSelect.vue'
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { useShiftStore } from '@/stores/shift';
import { watch } from 'vue';
import { toast } from 'vue-sonner';

const shiftStore = useShiftStore()

const formSchema = toTypedSchema(z.object({
  workerId: z.string(),
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const setFormFromShift = (shiftId: string) => {
  const shift = shiftStore.shifts.find(s => s.id === shiftId)
  if (!shift) return

  const startDateObj = new Date(shift.start * 1000)
  const endDateObj = new Date(shift.end * 1000)

  form.setValues({
    workerId: shift.workerId,
    startDate: startDateObj.toISOString().split('T')[0], // "YYYY-MM-DD"
    startTime: startDateObj.toTimeString().slice(0, 5),   // "HH:MM"
    endDate: endDateObj.toISOString().split('T')[0],
    endTime: endDateObj.toTimeString().slice(0, 5),
  })
}

const handleUpdate = form.handleSubmit(async (values) => {
  try {
    const startDateTimeStr = `${values.startDate}T${values.startTime}`
    const endDateTimeStr = `${values.endDate}T${values.endTime}`
  
    const start = new Date(startDateTimeStr)
    const end = new Date(endDateTimeStr)
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date or time format")
    }
  
    const currentWorkerId = shiftStore.shifts.find(shift => shiftStore.editShiftId === shift.id)?.workerId || '';
  
    await shiftStore.updateShift(shiftStore.editShiftId, currentWorkerId, values.workerId, start.toISOString(), end.toISOString())
    shiftStore.isEditMode = false
    shiftStore.editShiftId = ''
  } catch (e) {
    console.error(e)
    toast.error('Invalid date or time format')
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const startDateTimeStr = `${values.startDate}T${values.startTime}`
    const endDateTimeStr = `${values.endDate}T${values.endTime}`
  
    const start = new Date(startDateTimeStr)
    const end = new Date(endDateTimeStr)
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date or time format")
    }
  
    await shiftStore.addShift(values.workerId, start.toISOString(), end.toISOString())
    form.resetForm()
  } catch(e) {
    console.log(e)
    toast.error('Invalid date or time format')
  }
})

watch(() => shiftStore.isEditMode, (newVal, _oldVal) => {
  if(newVal === true) {
    setFormFromShift(shiftStore.editShiftId)
  } else {
    form.resetForm()
  }
})
</script>
