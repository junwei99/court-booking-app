<script setup lang="ts">
import { DatePicker } from "v-calendar"
import { defineEmits, computed } from "vue"

const props = defineProps<{
  categoryList: Array<{ id: string; name: string }>
  selectedDate: Date
  selectedCategory: number | null
}>()

const getDatePickerMinMaxDate = (type: "min" | "max") => {
  const currentDate = new Date()
  const newDate =
    type === "min" ? currentDate.getDate() : currentDate.getDate() + 30
  currentDate.setDate(newDate)
  return currentDate
}

const emit = defineEmits<{
  (e: "selectCategory", categoryId: number): void
  (e: "selectDate", date: Date): void
}>()

const reactiveDate = computed({
  get() {
    return props.selectedDate
  },
  set(newDate: Date) {
    emit("selectDate", newDate)
  },
})

const categorySelectOnChange = (e: Event) => {
  const target = <HTMLSelectElement>e.target
  emit("selectCategory", parseInt(target.value))
}

const disabledDateList: Array<Date> = []
</script>

<template>
  <div class="p-site-padding">
    <h2 class="font-semibold mb-5">Select your sport</h2>
    <select
      class="select select-bordered select-md w-full"
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
    <DatePicker
      v-model="reactiveDate"
      is-expanded
      :min-date="getDatePickerMinMaxDate('min')"
      :max-date="getDatePickerMinMaxDate('max')"
      :disabled-dates="disabledDateList"
    />
  </div>
</template>
