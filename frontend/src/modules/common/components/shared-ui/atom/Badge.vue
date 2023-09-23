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

const twClasses = computed(() => {
  if (props.color === "gray") {
    return {
      bg: "bg-gray-100",
      text: "text-gray-700",
    }
  }

  return {
    bg: "bg-blue-100",
    text: "text-blue-700",
  }
})
</script>

<template>
  <div :class="`${twClasses.bg} rounded-2xl px-3 py-[1px] text-sm`">
    <p :class="`${twClasses.text} font-semibold`">
      {{ text }}
    </p>
  </div>
</template>
