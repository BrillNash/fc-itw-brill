<template>
  <section>
    <Card class="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <CardTitle>Workers Management</CardTitle>
        <CardDescription>Add new worker</CardDescription>
      </CardHeader>
      <CardContent class="flex gap-4">
        <Input v-model="workerName" placeholder="Enter worker name" class="py-2 px-4" @keyup.enter="submit"/>
        <Button @click="submit" class="w-full rounded-sm max-w-32">
          <Plus />
          Add worker
        </Button>
      </CardContent>
      <CardFooter>
        <WorkerTable />
      </CardFooter>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import WorkerTable from './WorkerTable.vue';
import { useWorkerStore } from '@/stores/worker';
import { ref } from 'vue';

const workerStore = useWorkerStore()

const workerName = ref('')

const submit = async() => {
  await workerStore.addWorker(workerName.value)
  workerName.value = ''
}
</script>
