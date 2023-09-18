<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    text: string
    color?: "blue" | "gray"
  }>(),
  {
    color: "blue",
  }
)

const bgColorClass = computed(() => `bg-${props.color}-100`)
const textColorClass = computed(() => `text-${props.color}-700`)
</script>

<template>
  <div :class="`${bgColorClass} rounded-2xl px-3 py-[1px] text-sm`">
    <p :class="`${textColorClass} font-semibold`">
      {{ text }}
    </p>
  </div>
</template>
