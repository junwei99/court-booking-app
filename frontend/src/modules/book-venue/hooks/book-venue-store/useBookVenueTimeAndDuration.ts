import type {
  IAmPmObj,
  IDuration,
  IOutputTime,
} from "@/modules/book-venue/types/api"
import type { TTimeAndDurationKey } from "@/modules/book-venue/types/stores/book-venue-store.types"
import { getObjectEntries } from "@/modules/common/utils/general-utils"
import { computed, ref } from "vue"

export const INITIAL_TIME_DURATION_STATE: Record<TTimeAndDurationKey, string> =
  {
    selectedTime: "Select time",
    selectedAmPm: "AM / PM",
    selectedDuration: "Select duration",
  } as const

export const useBookVenueTimeAndDuration = () => {
  const bookVenueTimeAndDuration = ref<Record<TTimeAndDurationKey, string>>({
    ...INITIAL_TIME_DURATION_STATE,
  })

  const timeListRes = ref<Array<IOutputTime>>([])

  const isAll3ItemsSelected = computed(() =>
    getObjectEntries(bookVenueTimeAndDuration.value).every(
      ([key, value]) => value !== INITIAL_TIME_DURATION_STATE[key]
    )
  )

  const setBookVenueTimeAndDuration = (
    state: Record<TTimeAndDurationKey, string>
  ) => {
    bookVenueTimeAndDuration.value = state
  }

  const setTimeListRes = (newTimeListRes: Array<IOutputTime>) => {
    timeListRes.value = newTimeListRes
  }

  const getIsSelectedDurationNotAvailable = (amPmObj: IAmPmObj) =>
    !amPmObj.durations.some(
      (duration) =>
        bookVenueTimeAndDuration.value.selectedDuration ===
        duration.value.toString()
    )

  const getIsSelectedAmPmNotAvailable = (timeObj: IOutputTime) =>
    (!timeObj.amOrPm.am.isAvailable &&
      bookVenueTimeAndDuration.value.selectedAmPm === "AM") ||
    (!timeObj.amOrPm.pm.isAvailable &&
      bookVenueTimeAndDuration.value.selectedAmPm === "PM")

  const setAmPmFromRes = (
    selectValue: string,
    initAmPmList: (amIsAvailable: boolean, pmIsAvailable: boolean) => void
  ) => {
    const timeObj = timeListRes.value.find((obj) => obj.time === selectValue)

    //return early if timeObj is undefined
    if (!timeObj) return

    if (getIsSelectedAmPmNotAvailable(timeObj)) {
      bookVenueTimeAndDuration.value.selectedAmPm =
        INITIAL_TIME_DURATION_STATE.selectedAmPm
    }

    initAmPmList(timeObj.amOrPm.am.isAvailable, timeObj.amOrPm.pm.isAvailable)
  }

  const setDurationFromRes = (
    initDurationList: (durations: Array<IDuration>) => void
  ) => {
    const timeObj = timeListRes.value.find(
      (obj) => obj.time === bookVenueTimeAndDuration.value.selectedTime
    )

    if (!timeObj) return

    const amPmObj =
      bookVenueTimeAndDuration.value.selectedAmPm === "AM"
        ? timeObj.amOrPm.am
        : timeObj.amOrPm.pm

    if (getIsSelectedDurationNotAvailable(amPmObj)) {
      bookVenueTimeAndDuration.value.selectedDuration =
        INITIAL_TIME_DURATION_STATE.selectedDuration
    }

    initDurationList(amPmObj.durations)
  }

  const resetTimeAndDuration = () => {
    bookVenueTimeAndDuration.value = { ...INITIAL_TIME_DURATION_STATE }
  }

  const getters = {
    bookVenueTimeAndDuration,
    isAll3ItemsSelected,
  } as const

  const actions = {
    resetTimeAndDuration,
    setAmPmFromRes,
    setDurationFromRes,
    setTimeListRes,
    setBookVenueTimeAndDuration,
  } as const

  return { ...getters, ...actions }
}
