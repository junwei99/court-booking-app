<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="bg-blue-100 rounded-2xl px-3 py-[1px] text-sm">
    <p class="text-blue-700 font-semibold">
      {{ text }}
    </p>
  </div>
</template>
