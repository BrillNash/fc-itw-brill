<template>
  <Select>
    <SelectTrigger class="w-full border rounded-b-md">
      <SelectValue :placeholder="timezoneStore.timezone !== '' ? timezoneStore.timezone : 'Select a timezone'" />
    </SelectTrigger>
    <SelectContent class="max-h-60 overflow-y-auto">
      <SelectGroup v-for="timezone in timezones" :key="timezone.value">
        <SelectItem :value="timezone.value">
          {{ timezone.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import { timezones } from '@/constants/timezone';
import { useTimezoneStore } from '@/stores/timezone';

const timezoneStore = useTimezoneStore()
</script>