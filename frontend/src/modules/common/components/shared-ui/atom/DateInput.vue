<script setup lang="ts">
import { calendarIconSVG } from "@/assets/images/icons"
import dayjs from "dayjs"
import { Calendar } from "vant"
import { computed, ref } from "vue"

const props = defineProps<{
  selectedDate: Date
}>()

const emit = defineEmits<{
  (e: "selectDate", date: Date): void
}>()

const show = ref(false)

const showDateSelectorPopup = () => {
  show.value = true
}

const formatDate = (date: Date) => {
  const displayDate = dayjs(date).format("D MMM YYYY, dddd")
  return displayDate
}

const onConfirm = (value: any) => {
  show.value = false
  emit("selectDate", value)
}

const displayDate = computed(() => formatDate(props.selectedDate))

const getDisplayMonth = (date: Date) => dayjs(date).format("MMMM YYYY")

//get next month
const maxDate = computed(() =>
  dayjs(props.selectedDate).add(1, "month").toDate()
)
</script>

<template>
  <div class="form-control">
    <button
      class="input-group h-[3.5rem] border-[1px] border-gray-300 my-2 items-center text-center rounded-lg"
      @click="showDateSelectorPopup"
    >
      <input
        type="text"
        placeholder="Type here"
        :value="displayDate"
        disabled
        class="input input-bordered w-full h-full text-[1rem] bg-white border-none disabled:bg-white font-medium pointer-events-none"
      />
      <div
        class="btn btn-square h-full border-none text-black bg-white pointer-events-none"
      >
        <img alt="calendar icon" :src="calendarIconSVG" className="w-6 h-6" />
      </div>
    </button>
  </div>
  <Calendar
    title="Select your booking date"
    v-model:show="show"
    color="#1C4ED8"
    :show-confirm="false"
    :show-title="false"
    @confirm="onConfirm"
    :show-mark="false"
    :max-date="maxDate"
  >
    <template #subtitle="{ date }">
      <h1 className="text-xl font-semibold mb-2 mt-5">
        {{ getDisplayMonth(date) }}
      </h1>
    </template>
    <template #month-title="{ date }">
      <h2 className="text-base font-semibold pt-5">
        {{ getDisplayMonth(date) }}
      </h2>
    </template>
  </Calendar>
</template>
