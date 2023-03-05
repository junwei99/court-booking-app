import type {
  ISelectTimeObj,
  TSelectTimeMap,
} from "@/book-venue/types/components"
import type { IOutputTime } from "@/modules/book-venue/types/api"
import type { IDuration } from "@/modules/book-venue/types/api/booking-res.types"
import { InitialPage2SelectState } from "@/modules/book-venue/types/stores"
import { ref } from "vue"

const initialTimeList = [
  {
    text: InitialPage2SelectState.selectedTime,
    value: InitialPage2SelectState.selectedTime,
    disabled: true,
  },
]

const initialAmPmList = [
  {
    text: InitialPage2SelectState.selectedAmPm,
    value: InitialPage2SelectState.selectedAmPm,
    disabled: true,
  },
  {
    text: "AM",
    value: "AM",
    disabled: true,
  },
  {
    text: "PM",
    value: "PM",
    disabled: true,
  },
]

const initialDurationList = [
  {
    text: InitialPage2SelectState.selectedDuration,
    value: InitialPage2SelectState.selectedDuration,
    disabled: true,
  },
]

export const useSelectTimeMap = () => {
  const selectTimeMap = ref<TSelectTimeMap>(
    new Map([
      [
        "selectedTime",
        {
          list: initialTimeList,
        },
      ],
      [
        "selectedAmPm",
        {
          list: initialAmPmList,
        },
      ],
      [
        "selectedDuration",
        {
          list: initialDurationList,
        },
      ],
    ])
  )

  const timeListOperations = {
    init(availableBookingTimeList: Array<IOutputTime>) {
      let time1List: Array<ISelectTimeObj> = structuredClone(initialTimeList)

      availableBookingTimeList
        .filter(
          (timeObj) =>
            timeObj.amOrPm.am.isAvailable || timeObj.amOrPm.pm.isAvailable
        )
        .forEach((timeObj) => {
          time1List.push({ text: timeObj.time, value: timeObj.time })
        })

      selectTimeMap.value.set("selectedTime", { list: time1List })
    },
    reset() {
      let time1List: Array<ISelectTimeObj> = structuredClone(initialTimeList)
      selectTimeMap.value.set("selectedTime", { list: time1List })
    },
  }

  const amPmListOperations = {
    init(amIsAvailable: boolean, pmIsAvailable: boolean) {
      let time2List: Array<ISelectTimeObj> = structuredClone(initialAmPmList)
      if (amIsAvailable) time2List[1].disabled = false
      if (pmIsAvailable) time2List[2].disabled = false

      selectTimeMap.value.set("selectedAmPm", { list: time2List })
    },
    reset() {
      let time2List: Array<ISelectTimeObj> = structuredClone(initialAmPmList)
      selectTimeMap.value.set("selectedAmPm", { list: time2List })
    },
  }

  const durationListOperations = {
    init(durations: Array<IDuration>) {
      let durationList: Array<ISelectTimeObj> =
        structuredClone(initialDurationList)

      durations.forEach((selectedDuration) => {
        durationList.push({
          text: selectedDuration.key,
          value: selectedDuration.value.toString(),
        })
      })
      selectTimeMap.value.set("selectedDuration", { list: durationList })
    },
    reset() {
      let durationList: Array<ISelectTimeObj> =
        structuredClone(initialDurationList)

      selectTimeMap.value.set("selectedDuration", { list: durationList })
    },
  }

  return {
    selectTimeMap,
    timeListOperations,
    amPmListOperations,
    durationListOperations,
  }
}
