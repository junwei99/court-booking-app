<script setup lang="ts">
defineProps<{
  containerClass?: string;
  imageSrc?: string;
  imageAlt?: string;
}>();
</script>

<template>
  <div :class="`aspect-square overflow-hidden relative ${containerClass}`">
    <img
      class="absolute object-cover w-full h-full"
      :src="imageSrc"
      :alt="imageAlt"
    />
  </div>
</template>
