<script setup lang="ts">
// import { DatePicker } from "v-calendar"
import type { TCategory } from "@/modules/book-venue/types/components/book-venue.types"
import DateInput from "@/modules/common/components/shared-ui/atom/DateInput.vue"

defineProps<{
  categoryList: Array<TCategory>
  selectedDate: Date
  selectedCategory: number | null
}>()

// const getDatePickerMinMaxDate = (type: "min" | "max") => {
//   const currentDate = new Date()
//   const newDate =
//     type === "min" ? currentDate.getDate() : currentDate.getDate() + 30
//   currentDate.setDate(newDate)
//   return currentDate
// }

const emit = defineEmits<{
  (e: "selectCategory", categoryId: number): void
  (e: "selectDate", date: Date): void
}>()

// const reactiveDate = computed({
//   get() {
//     return props.selectedDate
//   },
//   set(newDate: Date) {
//     emit("selectDate", newDate)
//   },
// })

const categorySelectOnChange = (e: Event) => {
  const target = <HTMLSelectElement>e.target
  emit("selectCategory", parseInt(target.value))
}

const dateSelectOnChange = (newDate: Date) => {
  emit("selectDate", newDate)
}

// const date = ref("")
// const show = ref(false)

// const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}`
// const onConfirm = (value: any) => {
//   show.value = false
//   date.value = formatDate(value)
// }
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
    <!-- <DatePicker
      v-model="reactiveDate"
      is-expanded
      :min-date="getDatePickerMinMaxDate('min')"
      :max-date="getDatePickerMinMaxDate('max')"
      :disabled-dates="disabledDateList"
    /> -->
    <!-- <Calendar v-model:show="show" @confirm="onConfirm" /> -->
    <!-- <Cell title="Select Single Date" :value="date" @click="show = true" />
    <Calendar
      title="Select your booking date"
      v-model:show="show"
      color="#1C4ED8"
      :show-confirm="false"
      :show-title="false"
      @confirm="onConfirm"
    /> -->
    <DateInput
      :selected-date="selectedDate"
      @select-date="dateSelectOnChange"
    />
  </div>
</template>
