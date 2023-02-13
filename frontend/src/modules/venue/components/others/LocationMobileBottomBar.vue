<script setup lang="ts">
import PriceCurrency from "@/modules/common/components/shared-ui/atom/PriceCurrency.vue"
import Button from "@/modules/common/components/shared-ui/atom/Button.vue"
defineProps<{
  priceRange: { min: number; max: number }
  handleBookButtonOnClick: () => void
}>()
</script>

<template>
  <div class="sm:hidden flex justify-between bottom-action-bar">
    <div class="flex items-center">
      <h2 class="font-medium">
        <PriceCurrency :price="priceRange.min" />
      </h2>
      <div class="mx-1">-</div>
      <h2 class="font-semibold">
        {{ priceRange.max }}
      </h2>
      <p class="ml-1">/ hr</p>
    </div>
    <Button @click="handleBookButtonOnClick">Book now</Button>
  </div>
</template>
