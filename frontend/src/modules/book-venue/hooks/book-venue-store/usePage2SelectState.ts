import type {
  IAmPmObj,
  IDuration,
  IOutputTime,
} from "@/modules/book-venue/types/api/booking-res.types"
import { InitialPage2SelectState } from "@/modules/book-venue/types/stores"
import { useState } from "@/modules/common/hooks/useState"
import type { IDictionary } from "@/modules/common/types/utils.types"
import { computed } from "vue"

export const usePage2SelectState = () => {
  const [page2SelectState, setPage2SelectState] = useState<IDictionary<string>>(
    {
      selectedTime: InitialPage2SelectState.selectedTime,
      selectedAmPm: InitialPage2SelectState.selectedAmPm,
      selectedDuration: InitialPage2SelectState.selectedDuration,
    }
  )

  const [timeListRes, setTimeListRes] = useState<Array<IOutputTime>>([])

  const isAll3ItemsSelected = computed(() =>
    Object.entries(page2SelectState.value).every(
      ([key, value]) => value !== InitialPage2SelectState[key]
    )
  )

  const getIsSelectedDurationNotAvailable = (amPmObj: IAmPmObj) =>
    !amPmObj.durations.some(
      (duration) =>
        page2SelectState.value.selectedDuration === duration.value.toString()
    )

  const getIsSelectedAmPmNotAvailable = (timeObj: IOutputTime) =>
    (!timeObj.amOrPm.am.isAvailable &&
      page2SelectState.value.selectedAmPm === "AM") ||
    (!timeObj.amOrPm.pm.isAvailable &&
      page2SelectState.value.selectedAmPm === "PM")

  const setAmPmFromRes = (
    selectValue: string,
    initAmPmList: (amIsAvailable: boolean, pmIsAvailable: boolean) => void
  ) => {
    const timeObj = timeListRes.value.find((obj) => obj.time === selectValue)

    //return early if timeObj is undefined
    if (!timeObj) return

    if (getIsSelectedAmPmNotAvailable(timeObj)) {
      setPage2SelectState({
        ...page2SelectState.value,
        selectedAmPm: InitialPage2SelectState.selectedAmPm,
      })
    }

    initAmPmList(timeObj.amOrPm.am.isAvailable, timeObj.amOrPm.pm.isAvailable)
  }

  const setDurationFromRes = (
    initDurationList: (durations: Array<IDuration>) => void
  ) => {
    const timeObj = timeListRes.value.find(
      (obj) => obj.time === page2SelectState.value.selectedTime
    )

    if (!timeObj) return

    const amPmObj =
      page2SelectState.value.selectedAmPm === "AM"
        ? timeObj.amOrPm.am
        : timeObj.amOrPm.pm

    if (getIsSelectedDurationNotAvailable(amPmObj)) {
      setPage2SelectState({
        ...page2SelectState.value,
        selectedDuration: InitialPage2SelectState.selectedDuration,
      })
    }

    initDurationList(amPmObj.durations)
  }

  const resetPage2SelectState = () => {
    setPage2SelectState({ ...InitialPage2SelectState })
  }

  const getters = {
    page2SelectState,
    timeListRes,
    isAll3ItemsSelected,
  }

  const actions = {
    setTimeListRes,
    setPage2SelectState,
    setAmPmFromRes,
    setDurationFromRes,
    resetPage2SelectState,
  }

  return {
    ...getters,
    ...actions,
  }
}
