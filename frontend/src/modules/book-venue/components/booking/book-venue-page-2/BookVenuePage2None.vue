<script setup lang="ts">
defineProps<{
  typeOfLocation: string
}>()
</script>

<template>
  <div
    v-bind="$attrs"
    class="border-[1px] border-gray-300 my-2 p-5 items-center text-center rounded-xl text-gray-500"
  >
    {{
      `Please select a time and duration to see the ${typeOfLocation}s available`
    }}
  </div>
</template>
