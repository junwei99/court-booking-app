<script setup lang="ts">
import Badge from "@/modules/common/components/shared-ui/atom/Badge.vue"

defineProps<{
  eventCategories: Array<string>
}>()
</script>

<template>
  <div v-if="eventCategories" class="flex gap-2 mt-5 flex-wrap mb-5">
    <Badge
      v-for="eventCategory in eventCategories"
      :key="eventCategory"
      :text="eventCategory"
    />
  </div>
</template>
