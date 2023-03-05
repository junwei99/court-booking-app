import {
  useAvailableVenueList,
  useSelectTimeMap,
} from "@/modules/book-venue/hooks"
import { useBookVenueCategoryAndDate } from "@/modules/book-venue/hooks/book-venue-store/useBookVenueCategoryAndDate"
import {
  INITIAL_TIME_DURATION_STATE,
  useBookVenueTimeAndDuration,
} from "@/modules/book-venue/hooks/book-venue-store/useBookVenueTimeAndDuration"
import { fetchAvailableBookingTimeList } from "@/modules/book-venue/services/apis/fetch-available-booking-time-list"
import { fetchVenuesToBook } from "@/modules/book-venue/services/apis/fetch-venues-to-book"
import {
  getPage2StateNotAvailableConditions,
  getTransformedBookingDateTime,
} from "@/modules/book-venue/services/business/book-venue.business"
import type { IOutputTime } from "@/modules/book-venue/types/api"
import type { TTimeAndDurationKey } from "@/modules/book-venue/types/stores/book-venue-store.types"
import dayjs from "dayjs"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useBookVenueStore = defineStore("book-venue-test", () => {
  const isResettingOnNext = ref(false)

  const setIsResettingOnNext = (isResetting: boolean) => {
    isResettingOnNext.value = isResetting
  }

  const venueToBook = ref({
    id: 0,
    venueName: "",
    venueAddress: "",
    eventCategory: "",
    image: "",
    eventUnitType: "",
  })

  const {
    selectedCategory,
    selectedDate,
    handleSelectCategory,
    handleSelectDate,
    resetCategoryAndDate,
  } = useBookVenueCategoryAndDate(setIsResettingOnNext)

  const {
    bookVenueTimeAndDuration,
    isAll3ItemsSelected,
    resetTimeAndDuration,
    setAmPmFromRes,
    setDurationFromRes,
    setTimeListRes,
    setBookVenueTimeAndDuration,
  } = useBookVenueTimeAndDuration()

  //used to populate select element for time, am/pm and duration
  const {
    selectTimeMap,
    timeListOperations,
    amPmListOperations,
    durationListOperations,
  } = useSelectTimeMap()

  //booking date time initialized with current date, will be set when user select date, time, am/pm and duration
  const bookingDateTime = ref<Date>(selectedDate.value)

  //used to populate venue list
  const { venueState, clearVenues, setFetchedEventUnits } =
    useAvailableVenueList()

  const getTimeAndDurationValueFromKey = (selectKey: TTimeAndDurationKey) =>
    bookVenueTimeAndDuration.value[selectKey]

  const fetchAndSetAvailableBookingTimeList = async () => {
    if (!selectedCategory.value) {
      throw new Error("category not selected")
    }

    const availableBookingTimeList = await fetchAvailableBookingTimeList(
      venueToBook.value.id,
      selectedCategory.value,
      dayjs(selectedDate.value).toJSON()
    )

    setTimeListRes(availableBookingTimeList.outputTimeList)

    return availableBookingTimeList.outputTimeList
  }

  const setVenueToBook = (venue: {
    id: number
    venueName: string
    venueAddress: string
    image: string
    eventUnitType: string
  }) => {
    venueToBook.value = {
      ...venueToBook.value,
      ...venue,
    }
  }

  const setEventCategoryOfVenueToBook = (eventCategory: string) => {
    venueToBook.value = {
      ...venueToBook.value,
      eventCategory,
    }
  }

  const initLists = (
    timeListRes: IOutputTime[],
    selectedTimeIndex: number | undefined
  ) => {
    //init select time list
    timeListOperations.init(timeListRes)

    if (
      bookVenueTimeAndDuration.value.selectedAmPm !==
        INITIAL_TIME_DURATION_STATE.selectedAmPm &&
      selectedTimeIndex &&
      selectedTimeIndex >= 0
    ) {
      amPmListOperations.init(
        timeListRes[selectedTimeIndex].amOrPm.am.isAvailable,
        timeListRes[selectedTimeIndex].amOrPm.pm.isAvailable
      )

      if (
        bookVenueTimeAndDuration.value.selectedDuration !==
          INITIAL_TIME_DURATION_STATE.selectedDuration &&
        selectedTimeIndex &&
        selectedTimeIndex >= 0
      ) {
        const amPmKey =
          bookVenueTimeAndDuration.value.selectedAmPm === "AM" ? "am" : "pm"

        durationListOperations.init(
          timeListRes[selectedTimeIndex].amOrPm[amPmKey].durations
        )
      }
    }
  }

  const initAvailableBookingTimeAndDuration = async () => {
    const timeListRes = await fetchAndSetAvailableBookingTimeList()

    const selectedTimeIndex = selectTimeMap.value
      .get("selectedTime")
      ?.list.findIndex(
        (listObj) =>
          listObj.text === bookVenueTimeAndDuration.value.selectedTime
      )

    initLists(timeListRes, selectedTimeIndex)

    if (isResettingOnNext.value) {
      setBookVenueTimeAndDuration({
        ...INITIAL_TIME_DURATION_STATE,
      })
      clearVenues()
      setIsResettingOnNext(false)
      return
    }

    const {
      getIsTimeNotAvailable,
      getIsAmPmNotAvailable,
      getIsDurationNotAvailable,
    } = getPage2StateNotAvailableConditions(
      selectedTimeIndex,
      bookVenueTimeAndDuration.value.selectedAmPm,
      bookVenueTimeAndDuration.value.selectedDuration,
      timeListRes
    )

    if (getIsTimeNotAvailable()) {
      setBookVenueTimeAndDuration({
        ...INITIAL_TIME_DURATION_STATE,
      })
      amPmListOperations.reset()
      durationListOperations.reset()

      clearVenues()
    } else if (getIsAmPmNotAvailable()) {
      setBookVenueTimeAndDuration({
        ...INITIAL_TIME_DURATION_STATE,
        selectedTime: bookVenueTimeAndDuration.value.selectedTime,
      })

      clearVenues()
    } else if (getIsDurationNotAvailable()) {
      setBookVenueTimeAndDuration({
        ...bookVenueTimeAndDuration.value,
        selectedDuration: INITIAL_TIME_DURATION_STATE.selectedDuration,
      })
      clearVenues()
    }
  }

  const handleSelectTimeAndDurationOnChange = async (
    selectKey: TTimeAndDurationKey,
    selectValue: string
  ) => {
    setBookVenueTimeAndDuration({
      ...bookVenueTimeAndDuration.value,
      [selectKey]: selectValue,
    })

    //populate list
    if (selectKey === "selectedTime") {
      setAmPmFromRes(selectValue, amPmListOperations.init)
      setDurationFromRes(durationListOperations.init)
    } else if (selectKey === "selectedAmPm") {
      setDurationFromRes(durationListOperations.init)
    }

    if (!isAll3ItemsSelected.value) {
      clearVenues()
      return
    }

    //if all 3 select has a value,  fetch venue list
    const transformedBookingDateTime = getTransformedBookingDateTime(
      selectedDate.value,
      bookVenueTimeAndDuration.value.selectedTime,
      bookVenueTimeAndDuration.value.selectedAmPm
    )

    // bookingDateTime.value = transformedBookingDateTime
    bookingDateTime.value = transformedBookingDateTime

    const bookingDuration = parseInt(
      bookVenueTimeAndDuration.value.selectedDuration
    )

    const fetchVenuesToBookCallback = async () =>
      await fetchVenuesToBook(
        venueToBook.value.id,
        selectedCategory.value as number,
        transformedBookingDateTime,
        bookingDuration
      )

    setFetchedEventUnits(
      fetchVenuesToBookCallback,
      bookingDuration,
      transformedBookingDateTime
    )
  }

  const resetStore = () => {
    resetTimeAndDuration()
    resetCategoryAndDate()
    timeListOperations.reset()
    amPmListOperations.reset()
    durationListOperations.reset()
    clearVenues()
  }

  const getters = {
    selectedCategory,
    selectedDate,
    bookVenueTimeAndDuration,
    venueState,
    selectTimeMap,
    bookingDateTime,
    venueToBook,
  } as const

  const actions = {
    setVenueToBook,
    setEventCategoryOfVenueToBook,
    handleSelectCategory,
    handleSelectDate,
    handleSelectTimeAndDurationOnChange,
    initAvailableBookingTimeAndDuration,
    getTimeAndDurationValueFromKey,
    resetStore,
  } as const

  return {
    ...getters,
    ...actions,
  }
})
