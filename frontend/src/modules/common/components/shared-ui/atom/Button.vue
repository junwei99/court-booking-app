<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    selected?: boolean
    variant?: "contained" | "outlined"
    state: "loading" | "none" | "clickable-disabled"
  }>(),
  {
    selected: false,
    variant: "contained",
    state: "none",
  }
)

const getStateStyles = () => {
  switch (props.state) {
    case "loading": {
      return "bg-gray-500 border-none  pointer-events-none"
    }
    case "clickable-disabled": {
      return "bg-gray-300 border-none text-gray-400"
    }
    case "none": {
      if (props.variant === "outlined") {
        return [
          "btn-outline border-primary-normal",
          props.selected
            ? "text-white border-primary-normal bg-primary-normal"
            : "text-primary-normal",
          "hover:text-white hover:border-primary-normal hover:bg-primary-normal",
        ].join(" ")
      } else {
        return [
          "text-white bg-primary-normal border-primary-normal",
          "hover:text-white hover:border-primary-light hover:bg-primary-light",
        ].join(" ")
      }
    }
    default: {
      return ""
    }
  }
}
</script>

<template>
  <button :class="['btn', getStateStyles()].join(' ')">
    <template v-if="state === 'loading'">
      <span class="loading loading-spinner loading-xs"></span>
      loading
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>
