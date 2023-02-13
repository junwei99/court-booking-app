<script setup lang="ts">
const props = defineProps<{
  selected?: boolean;
}>();
</script>

<template>
  <button
    :class="
      [
        'border-[1px] border-primary-normal rounded-md p-3 uppercase font-semibold text-sm',
        selected
          ? 'bg-primary-normal border-primary-normal text-white'
          : 'text-primary-normal',
      ].join(' ')
    "
  >
    <slot></slot>
  </button>
</template>
