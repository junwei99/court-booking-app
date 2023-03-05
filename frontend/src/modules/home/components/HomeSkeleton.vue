<script setup lang="ts">
const skeletonItemCardList = Array.from(Array(20).keys())
</script>

<template>
  <div class="mx-site-padding mb-site-padding">
    <template
      v-for="skeletonItemCard in skeletonItemCardList"
      :key="skeletonItemCard"
    >
      <div
        class="skeleton-pulse aspect-square w-full rounded-xl mt-site-padding"
      />
      <div class="skeleton-pulse h-5 w-[5rem] mt-3" />
      <div class="skeleton-pulse h-4 w-[15rem] mt-2" />
      <div class="skeleton-pulse h-4 w-[20rem] mt-2" />
      <div class="skeleton-pulse h-4 w-[8rem] mt-2" />
    </template>
  </div>
</template>
