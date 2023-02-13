<script setup lang="ts">
import SquareImage from "@/modules/common/components/shared-ui/atom/SquareImage.vue"

defineProps<{
  eventCategories: Array<{
    name: string
  }>
  title: string
  location: string
  imageSrc?: string
  priceRange: { min: number; max: number }
}>()
</script>

<template>
  <div>
    <SquareImage containerClass="rounded-2xl" :imageSrc="imageSrc" />
    <h4 class="font-semibold mt-3">{{ title }}</h4>
    <p class="text-gray-500">{{ location }}</p>
    <div class="flex">
      <p
        v-for="eventCategory in eventCategories"
        :key="eventCategory.name"
        class="text-sm text-primary-normal mr-2"
      >
        {{ eventCategory.name }}
      </p>
    </div>
    <p class="font-semibold mt-2">
      RM{{ priceRange.min }} - {{ priceRange.max }} / <span>hour</span>
    </p>
  </div>
</template>
