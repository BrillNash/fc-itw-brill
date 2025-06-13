<template>
  <div class="w-full h-full max-h-54 overflow-scroll">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-1/3">Name</TableHead>
          <TableHead class="w-1/3">Created</TableHead>
          <TableHead class="w-1/3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(worker, key) in workerStore.workers" :key="worker.id">
          <TableCell>
            <div v-if="isEdit && key.toString() === editMode.activeEditKey">
              <Input 
                v-model="newName" 
                type="text"
                class="w-full max-w-64"
                @blur.prevent="handleUpdate(worker.id)"
                @keyup.enter="handleBlur"
              />
            </div>
            <div v-else class="max-w-40 sm:max-w-64 text-ellipsis overflow-hidden">{{ worker.name }}</div>
          </TableCell>
          <TableCell>{{ formatEpochToDate(worker.created_at) }}</TableCell>
          <TableCell>
            <div class="space-x-1">
              <Button @click="toggleEdit(worker.name, key.toString())" class="hover:bg-white bg-transparent shadow-none"><SquarePen class="w-4 h-4 text-black"/></Button>
              <Button @click="handleDelete(worker.id)" class="hover:bg-white bg-transparent shadow-none"><Trash2 class="w-4 h-4 text-black"/></Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { useWorkerStore } from '@/stores/worker'
import { ref } from 'vue';

const workerStore = useWorkerStore()

const isEdit = ref(false)
const editMode = ref<any>({
  activeEditKey: '',
  row: Number.NEGATIVE_INFINITY
})
const newName = ref('')

const handleBlur = (event: Event) => {
  (event.target as HTMLInputElement).blur()
}

const handleUpdate = async(id: string) => {
  await workerStore.updateWorker(id, newName.value)
  isEdit.value = false
}

const handleDelete = async(id: string) => {
  await workerStore.deleteWorker(id)
  isEdit.value = false
}

const toggleEdit = (name: string, key: string) => {
  editMode.value.activeEditKey = key

  isEdit.value = !isEdit.value
  newName.value = name
}


const formatEpochToDate = (epoch: number): string => {
  const date = new Date(epoch)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}
</script>
