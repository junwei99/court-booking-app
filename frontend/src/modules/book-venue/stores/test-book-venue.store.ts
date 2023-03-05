import {
  useAvailableVenueList,
  useSelectTimeMap,
} from "@/modules/book-venue/hooks"
import { useBookVenueCategoryAndDate } from "@/modules/book-venue/hooks/book-venue-store/useBookVenueCategoryAndDate"
import { useBookVenueTimeAndDuration } from "@/modules/book-venue/hooks/book-venue-store/useBookVenueTimeAndDuration"
import { fetchVenuesToBook } from "@/modules/book-venue/services/apis/fetch-venues-to-book"
import { getTransformedBookingDateTime } from "@/modules/book-venue/services/business/book-venue.business"
import type { TTimeAndDurationKey } from "@/modules/book-venue/types/stores/book-venue-store.types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useBookVenueStore = defineStore("book-venue-test", () => {
  const isResettingOnNext = ref(false)

  const setIsResettingOnNext = (isResetting: boolean) => {
    isResettingOnNext.value = isResetting
  }

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
    getIsSelectedDurationNotAvailable,
    getIsSelectedAmPmNotAvailable,
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

  const handleSelectTimeAndDurationOnChange = async (
    selectKey: TTimeAndDurationKey,
    selectValue: string
  ) => {
    setBookVenueTimeAndDuration(selectKey, selectValue)

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
        0,
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
  } as const

  const actions = {
    handleSelectCategory,
    handleSelectDate,
    handleSelectTimeAndDurationOnChange,
    resetStore,
  } as const

  return {
    ...getters,
    ...actions,
  }
})
