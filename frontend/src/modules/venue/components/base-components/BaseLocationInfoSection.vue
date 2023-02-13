<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div>
    <h2 class="font-semibold mb-3">{{ title }}</h2>
    <slot></slot>
  </div>
</template>
