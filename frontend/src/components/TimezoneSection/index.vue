<template>
  <section>
    <Card class="w-full h-full rounded-lg border">
      <CardHeader>
        <CardTitle>Timezone Settings</CardTitle>
        <CardDescription>Preffered Timezone</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <TimezoneSelect v-model="updatedTimezone"/>
        <Button @click="update()" class="px-4 py-2 w-fit rounded-sm">Update Timezone</Button>
      </CardContent>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import TimezoneSelect from './TimezoneSelect.vue'
import { useTimezoneStore } from '@/stores/timezone'
import { ref } from 'vue'

const timezoneStore = useTimezoneStore()

const updatedTimezone = ref(timezoneStore.timezone)

const update = async () => {
  await timezoneStore.updateTimezone(updatedTimezone.value)
}
</script>