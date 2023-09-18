<script setup lang="ts">
import Badge from "@/modules/common/components/shared-ui/atom/Badge.vue"
import SquareImage from "@/modules/common/components/shared-ui/atom/SquareImage.vue"

defineProps<{
  eventCategories: Array<string>
  title: string
  location: string
  imageSrc?: string
  priceRange: { min: number; max: number }
}>()
</script>

<template>
  <div>
    <SquareImage containerClass="rounded-2xl" :imageSrc="imageSrc" />
    <h2 class="font-semibold mt-3 text-xl">{{ title }}</h2>
    <h3>{{ location }}</h3>
    <div class="flex flex-wrap gap-1 pt-2">
      <!-- <p :key="eventCategory" class="text-sm text-primary-normal mr-2">
        {{ eventCategory }}
      </p> -->
      <Badge v-for="eventCategory in eventCategories" :text="eventCategory" />
    </div>
    <p class="font-semibold mt-2">
      RM{{ priceRange.min }} - {{ priceRange.max }} / <span>hour</span>
    </p>
  </div>
</template>
