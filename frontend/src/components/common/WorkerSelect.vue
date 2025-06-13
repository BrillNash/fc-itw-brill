<template>
  <Select>
    <SelectTrigger class="w-full border rounded-b-md">
      <SelectValue placeholder="Enter worker name" />
    </SelectTrigger>
    <SelectContent class="max-h-60 overflow-y-auto">
      <SelectGroup v-for="worker in workerStore.workers" :key="worker.id">
        <SelectItem :value="worker.id">
          {{ worker.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import { useWorkerStore } from '@/stores/worker';

const workerStore = useWorkerStore()
</script>
