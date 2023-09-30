import type { TAvailableBookingTimeList } from "@/modules/book-venue/services/apis/fetch-available-booking-time-list"
import type {
  TAmPm,
  TBookVenueFormData,
  TBookingTimeSelectItemType,
} from "@/modules/book-venue/types/stores/book-venue-store.types"
import { computed, type Ref } from "vue"

export const useSelectBookingTime = (
  availableBookingTimeList: Ref<TAvailableBookingTimeList>,
  formData: Ref<TBookVenueFormData>
) => {
  const getTimelist = (availableBookingTimeList: TAvailableBookingTimeList) => [
    { text: "Select Time", value: "" },
    ...availableBookingTimeList.map((b) => ({
      text: b.time,
      value: b.time,
    })),
  ]

  const getAmPmList = (
    availableBookingTimeList: TAvailableBookingTimeList,
    selectedTime: string
  ) => {
    const amOrPmObj = availableBookingTimeList.find(
      (b) => b.time === selectedTime
    )?.amOrPm

    const initialVal = { text: "AM / PM", value: "" }

    if (!amOrPmObj) {
      return [initialVal]
    }

    return [
      initialVal,
      ...Object.keys(amOrPmObj)
        .filter((key) => amOrPmObj[key as keyof typeof amOrPmObj].isAvailable)
        .map((key) => {
          const uppercaseKey = key.toUpperCase()
          return {
            text: uppercaseKey,
            value: uppercaseKey,
          }
        }),
    ]
  }

  const getDurationList = (
    availableBookingTimeList: TAvailableBookingTimeList,
    selectedTime: string,
    amPm: TAmPm
  ) => {
    const amOrPmObj = availableBookingTimeList.find(
      (b) => b.time === selectedTime
    )?.amOrPm

    const initialVal = { text: "Select Duration", value: 0 }

    if (!amOrPmObj) {
      return [initialVal]
    }

    const key = amPm.toLowerCase() as keyof typeof amOrPmObj

    if (!amOrPmObj[key]) {
      return [initialVal]
    }

    return [
      initialVal,
      ...amOrPmObj[key].durations.map((d) => ({
        text: d.key,
        value: d.value,
      })),
    ]
  }

  const selectBookingTimeMap = computed(
    () =>
      new Map<
        TBookingTimeSelectItemType,
        {
          text: string
          value: string | number
        }[]
      >([
        ["time", getTimelist(availableBookingTimeList.value)],
        [
          "amPm",
          getAmPmList(
            availableBookingTimeList.value,
            formData.value.selectedTime
          ),
        ],
        [
          "duration",
          getDurationList(
            availableBookingTimeList.value,
            formData.value.selectedTime,
            formData.value.selectedAmPm
          ),
        ],
      ])
  )

  return {
    selectBookingTimeMap,
  }
}
