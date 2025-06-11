<template>
  <Select>
    <SelectTrigger class="w-full border rounded-b-md">
      <SelectValue placeholder="Enter worker name" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'



</script>

<style lang="scss" scoped>

</style>