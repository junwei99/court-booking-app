<script setup lang="ts">
import type { TCategory } from "@/modules/book-venue/types/components/book-venue.types"
import DateInput from "@/modules/common/components/shared-ui/atom/DateInput.vue"

defineProps<{
  categoryList: Array<TCategory>
  selectedDate: Date
  selectedCategory: number | null
}>()

const emit = defineEmits<{
  (e: "selectCategory", categoryId: number): void
  (e: "selectDate", date: Date): void
}>()

const categorySelectOnChange = (e: Event) => {
  const target = <HTMLSelectElement>e.target
  emit("selectCategory", parseInt(target.value))
}

const dateSelectOnChange = (newDate: Date) => {
  emit("selectDate", newDate)
}
</script>

<template>
  <div class="p-site-padding">
    <h2 class="font-semibold mb-5">Select your sport</h2>
    <select
      class="select select-md w-full border-[1px] border-gray-300"
      :value="selectedCategory"
      @change="categorySelectOnChange"
    >
      <option
        v-for="category in categoryList"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <div class="divider"></div>
    <h2 class="font-semibold mb-5">Select your booking date</h2>
    <DateInput
      :selected-date="selectedDate"
      @select-date="dateSelectOnChange"
    />
  </div>
</template>
