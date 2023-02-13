<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <li class="mb-3">
    <h4 class="font-semibold mb-1">{{ title }}</h4>
    <slot></slot>
  </li>
</template>
