<script setup lang="ts">
import { useSelectBookingTime } from "@/modules/book-venue/hooks/book-venue-store/useSelectBookingTime"
import type { TAvailableBookingTimeList } from "@/modules/book-venue/services/apis/fetch-available-booking-time-list"
import type {
  TBookVenueFormData,
  TBookingTimeSelectItemType,
} from "@/modules/book-venue/types/stores/book-venue-store.types"
import { toRefs } from "vue"

const props = defineProps<{
  // selectItemsMap: TSelectTimeMap
  availableBookingTimeList: TAvailableBookingTimeList
  formData: TBookVenueFormData
}>()

const emit = defineEmits<{
  (
    e: "select-item",
    prop: { type: TBookingTimeSelectItemType; payload: string }
  ): Promise<void>
}>()

const { availableBookingTimeList, formData } = toRefs(props)

const { selectBookingTimeMap } = useSelectBookingTime(
  availableBookingTimeList,
  formData
)

const getSelectValue = (selectKey: TBookingTimeSelectItemType) => {
  const keyMap = {
    time: "selectedTime",
    amPm: "selectedAmPm",
    duration: "selectedDuration",
  } as const

  return props.formData?.[keyMap?.[selectKey] as keyof typeof props.formData]
}
</script>

<template>
  <div class="grid grid-cols-[2fr_1fr] gap-4 mb-5">
    <select
      v-for="[selectKey, selectItemValue] in selectBookingTimeMap"
      :key="selectKey"
      :class="`select border-[1px] border-gray-300 select-md ${
        selectKey === 'duration' && 'col-start-1 col-end-3'
      } `"
      :value="getSelectValue(selectKey)"
      @change="(e) => emit('select-item', { type: selectKey , payload: (e.target as HTMLSelectElement).value })"
    >
      <option
        class="text-base-300"
        v-for="(selectItem, index) in selectItemValue"
        :key="selectItem.text"
        :value="selectItem.value"
        :selected="index === 0"
        :disabled="index === 0"
      >
        {{ selectItem.text }}
      </option>
    </select>
  </div>
</template>
