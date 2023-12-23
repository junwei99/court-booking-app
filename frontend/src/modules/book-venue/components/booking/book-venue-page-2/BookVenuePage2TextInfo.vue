<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'none' | 'empty'
  typeOfLocation: string
}>()

const copywriting = computed(() => {
  if (props.type === 'empty') {
    return `Oops, no ${props.typeOfLocation}s is found.`
  }

  if (props.type === 'none') {
    return `Please select a time and duration to see the ${props.typeOfLocation}s available`
  }

  return ''
})
</script>
<template>
  <div
    v-if="copywriting"
    v-bind="$attrs"
    class="border-[1px] border-gray-300 my-2 p-5 items-center text-center rounded-xl text-gray-500"
  >
    {{ copywriting }}
  </div>
</template>
