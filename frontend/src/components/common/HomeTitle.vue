<template>
  <h1 class="text-4xl font-bold">
    {{ props.title }}
  </h1>
</template>

<script lang="ts" setup>
type Props = {
  title: String
}

const props = defineProps<Props>()
</script>