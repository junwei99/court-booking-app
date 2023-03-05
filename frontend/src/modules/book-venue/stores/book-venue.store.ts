import {
  useAvailableVenueList,
  useSelectTimeMap,
} from "@/modules/book-venue/hooks"
import { usePage1SelectState } from "@/modules/book-venue/hooks/book-venue-store/usePage1SelectState"
import { usePage2SelectState } from "@/modules/book-venue/hooks/book-venue-store/usePage2SelectState"
import { fetchAvailableBookingTimeList } from "@/modules/book-venue/services/apis/fetch-available-booking-time-list"
import { fetchVenuesToBook } from "@/modules/book-venue/services/apis/fetch-venues-to-book"
import {
  getPage2StateNotAvailableConditions,
  getTransformedBookingDateTime,
} from "@/modules/book-venue/services/business/book-venue.business"
import type { IOutputTime } from "@/modules/book-venue/types/api"
import { InitialPage2SelectState } from "@/modules/book-venue/types/stores"
import type { TSelectKey } from "@/modules/book-venue/types/stores/book-venue-store.types"
import { useState } from "@/modules/common/hooks/useState"
import type { IDictionary } from "@/modules/common/types/utils.types"
import appRouter from "@/router"
import { useStorage } from "@vueuse/core"
import dayjs from "dayjs"
import { defineStore } from "pinia"
import { ref } from "vue"

type TVenueToBook = {
  id: number
  image: string
  eventCategory: string
  venueName: string
  venueAddress: string
  eventUnitType: string
}

export const useBookVenueStore = defineStore("book-venue", () => {
  const venueToBookLocalStorage = useStorage("venueToBook", {
    id: 0,
    image: "",
    eventCategory: "",
    venueName: "",
    venueAddress: "",
    eventUnitType: "",
  })

  const [page, setPage] = useState<"1" | "2">("1")

  //used to populate venue list
  const { venueState, clearVenues, setFetchedEventUnits } =
    useAvailableVenueList()

  //used to populate select element for time, am/pm and duration
  const {
    selectTimeMap,
    timeListOperations,
    amPmListOperations,
    durationListOperations,
  } = useSelectTimeMap()

  const [isResettingOnNext, setIsResettingOnNext] = useState(false)

  const {
    page1SelectState,
    handleSelectCategory,
    handleSelectDate,
    resetPage1SelectState,
  } = usePage1SelectState(setIsResettingOnNext)

  //booking date time initialized with current date, will be set when user select date, time, am/pm and duration
  const bookingDateTime = ref<Date>(page1SelectState.value.selectedDate)

  const {
    page2SelectState,
    isAll3ItemsSelected,
    setTimeListRes,
    setPage2SelectState,
    setAmPmFromRes,
    setDurationFromRes,
    resetPage2SelectState,
  } = usePage2SelectState()

  const selectKeyMap: IDictionary<string> = {
    time1: "selectedTime",
    time2: "selectedAmPm",
    duration: "selectedDuration",
  }

  //TODO :
  //once date or sports is selected, only time is reset, the AM/PM and duration is not reset

  const fetchAndSetAvailableBookingTimeList = async () => {
    const availableBookingTimeList = await fetchAvailableBookingTimeList(
      venueToBookLocalStorage.value.id,
      page1SelectState.value.selectedCategory as number,
      dayjs(page1SelectState.value.selectedDate).toJSON()
    )

    setTimeListRes(availableBookingTimeList.outputTimeList)

    return availableBookingTimeList.outputTimeList
  }

  const initLists = (
    timeListRes: IOutputTime[],
    selectedTimeIndex: number | undefined
  ) => {
    //init select time list
    timeListOperations.init(timeListRes)

    if (
      page2SelectState.value.selectedAmPM !==
        InitialPage2SelectState.selectedAmPm &&
      selectedTimeIndex &&
      selectedTimeIndex >= 0
    ) {
      amPmListOperations.init(
        timeListRes[selectedTimeIndex].amOrPm.am.isAvailable,
        timeListRes[selectedTimeIndex].amOrPm.pm.isAvailable
      )

      if (
        page2SelectState.value.selectedDuration !==
          InitialPage2SelectState.selectedDuration &&
        selectedTimeIndex &&
        selectedTimeIndex >= 0
      ) {
        const amPmKey =
          page2SelectState.value.selectedAmPm === "AM" ? "am" : "pm"

        durationListOperations.init(
          timeListRes[selectedTimeIndex].amOrPm[amPmKey].durations
        )
      }
    }
  }

  const nextButtonOnClick = async () => {
    if (page.value === "2") {
      appRouter.push({ name: "cart" })
      return
    }

    //fetch and set available booking time list
    const outputTimeListRes = await fetchAndSetAvailableBookingTimeList()

    const selectedTimeIndex = selectTimeMap.value
      .get("time1")
      ?.list.findIndex(
        (listObj) => listObj.text === page2SelectState.value.selectedTime
      )

    initLists(outputTimeListRes, selectedTimeIndex)

    if (isResettingOnNext.value) {
      setPage2SelectState({ ...InitialPage2SelectState })
      clearVenues()
      setIsResettingOnNext(false)
      setPage("2")
      return
    }

    const {
      getIsTimeNotAvailable,
      getIsAmPmNotAvailable,
      getIsDurationNotAvailable,
    } = getPage2StateNotAvailableConditions(
      selectedTimeIndex,
      page2SelectState.value.selectedAmPm,
      page2SelectState.value.selectedDuration,
      outputTimeListRes
    )

    if (getIsTimeNotAvailable()) {
      setPage2SelectState({
        ...InitialPage2SelectState,
      })
      amPmListOperations.reset()
      durationListOperations.reset()

      clearVenues()
    } else if (getIsAmPmNotAvailable()) {
      setPage2SelectState({
        ...InitialPage2SelectState,
        selectedTime: page2SelectState.value.selectedTime,
      })

      clearVenues()
    } else if (getIsDurationNotAvailable()) {
      setPage2SelectState({
        ...page2SelectState.value,
        selectedDuration: InitialPage2SelectState.selectedDuration,
      })
      clearVenues()
    }

    setPage("2")
  }

  const handleSelectItemOnChange = (
    selectKey: TSelectKey,
    selectValue: string
  ) => {
    setPage2SelectState({
      ...page2SelectState.value,
      [selectKeyMap[selectKey]]: selectValue,
    })

    if (selectKey === "time1") {
      setAmPmFromRes(selectValue, amPmListOperations.init)
      setDurationFromRes(durationListOperations.init)
    } else if (selectKey === "time2") {
      setDurationFromRes(durationListOperations.init)
    }

    //if all 3 select has a value,  fetch venue list
    if (isAll3ItemsSelected.value) {
      const transformedBookingDateTime = getTransformedBookingDateTime(
        page1SelectState.value.selectedDate,
        page2SelectState.value.selectedTime,
        page2SelectState.value.selectedAmPm
      )

      // bookingDateTime.value = transformedBookingDateTime
      bookingDateTime.value = transformedBookingDateTime

      const bookingDuration = parseInt(page2SelectState.value.selectedDuration)

      const fetchVenuesToBookCallback = async () =>
        await fetchVenuesToBook(
          venueToBookLocalStorage.value.id,
          page1SelectState.value.selectedCategory as number,
          transformedBookingDateTime,
          bookingDuration
        )

      setFetchedEventUnits(
        fetchVenuesToBookCallback,
        bookingDuration,
        transformedBookingDateTime
      )
    } else {
      clearVenues()
    }
  }

  const getSelectValue = (selectKey: string) =>
    page2SelectState.value[selectKeyMap[selectKey]]

  const setVenueToBook = (newVenueToBookLocalStorage: TVenueToBook) => {
    venueToBookLocalStorage.value = newVenueToBookLocalStorage
  }

  const resetStore = () => {
    //complete reset of the store
    resetPage1SelectState()
    resetPage2SelectState()
    timeListOperations.reset()
    amPmListOperations.reset()
    durationListOperations.reset()
    clearVenues()
    setPage("1")
  }

  const getters = {
    page,
    page1SelectState,
    page2SelectState,
    venueState,
    selectTimeMap,
    bookingDateTime,
    venueToBook: venueToBookLocalStorage,
  } as const

  const actions = {
    setVenueToBook,
    handleSelectCategory,
    handleSelectDate,
    setPage,
    nextButtonOnClick,
    handleSelectItemOnChange,
    getSelectValue,
    resetStore,
  } as const

  return {
    ...actions,
    ...getters,
  }
})
