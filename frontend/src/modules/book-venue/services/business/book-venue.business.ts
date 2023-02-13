import dayjs from "dayjs"
import type { IOutputTime } from "@/modules/book-venue/types/api"

export const getTransformedBookingDateTime = (
  selectedDate: Date,
  selectedTime: string,
  selectedAmPm: string
) => {
  const formatedDay = dayjs(selectedDate).format("MM-DD-YYYY")

  return dayjs(`${formatedDay} ${selectedTime} ${selectedAmPm}`).toDate()
}

export const getPage2StateNotAvailableConditions = (
  selectedTimeIndex: number | undefined,
  selectedAmPm: string,
  selectedDuration: string,
  timeListRes: IOutputTime[]
) => {
  const getIsTimeNotAvailable = () =>
    !selectedTimeIndex || selectedTimeIndex < 0

  const getIsAmPmNotAvailable = () => {
    if (!selectedTimeIndex || selectedTimeIndex < 0) return true

    const amMismatched =
      selectedAmPm === "AM" &&
      !timeListRes[selectedTimeIndex].amOrPm.am.isAvailable

    const pmMismatched =
      selectedAmPm === "PM" &&
      !timeListRes[selectedTimeIndex].amOrPm.pm.isAvailable

    return amMismatched || pmMismatched
  }

  const getIsDurationNotAvailable = () => {
    //guard clause if selectedTimeIndex is not valid and selectedAmPm is not "AM" or "PM"
    if (
      !selectedTimeIndex ||
      selectedTimeIndex < 0 ||
      (selectedAmPm !== "AM" && selectedAmPm !== "PM")
    ) {
      return true
    }

    let durationFound = false

    const amPmKey = selectedAmPm === "AM" ? "am" : "pm"

    durationFound =
      !!selectedDuration &&
      timeListRes[selectedTimeIndex].amOrPm[amPmKey].durations.some(
        (duration) => duration.value.toString() === selectedDuration
      )

    return !durationFound
  }

  return {
    getIsTimeNotAvailable,
    getIsAmPmNotAvailable,
    getIsDurationNotAvailable,
  }
}
