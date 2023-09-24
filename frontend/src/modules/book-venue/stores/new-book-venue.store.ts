import {
  fetchAvailableBookingTimeList,
  type TAvailableBookingTimeList,
} from "@/modules/book-venue/services/apis/fetch-available-booking-time-list"
import {
  fetchEventCategoriesOfVenue,
  type TEventCategories,
} from "@/modules/book-venue/services/apis/fetch-event-categories-of-venue"
import {
  fetchEventUnitsToBook,
  type TEventUnitsToBookList,
  type TVenueFromEventUnitsToBookRes,
} from "@/modules/book-venue/services/apis/fetch-event-units-to-book"
import { getTransformedBookingDateTime } from "@/modules/book-venue/services/business/book-venue.business"
import type {
  TBookVenueFormData,
  TDispatchSelectItemEventProps,
} from "@/modules/book-venue/types/stores/book-venue-store.types"
import { HandledError } from "@/modules/common/utils/custom-error.utils"
import dayjs from "dayjs"
import { defineStore } from "pinia"
import { ref } from "vue"

type TCreateDefineStoreProps = {
  fetchAvailableBookingTimeList: typeof fetchAvailableBookingTimeList
  fetchEventCategoriesOfVenue: typeof fetchEventCategoriesOfVenue
  fetchEventUnitsToBook: typeof fetchEventUnitsToBook
}

const INITIAL_FORM_DATA = {
  selectedDate: new Date(),
  selectedCategory: null,
  selectedTime: "",
  selectedAmPm: "",
  selectedDuration: 0,
} as const

const createBookVenueStore = ({
  fetchAvailableBookingTimeList,
  fetchEventCategoriesOfVenue,
  fetchEventUnitsToBook,
}: TCreateDefineStoreProps) =>
  defineStore("new-book-venue-store", () => {
    const eventCategoryList = ref<TEventCategories>([])
    const formData = ref<TBookVenueFormData>({ ...INITIAL_FORM_DATA })

    const venueIdToBook = ref<number | null>(null)
    const fetchEventCategoriesStatus = ref<"loading" | "none">("none")
    const fetchInitBookingTimeAndDurationStatus = ref<
      "loading" | "none" | "fetched"
    >("none")
    const fetchEventUnitsToBookStatus = ref<"loading" | "none" | "fetched">(
      "none"
    )
    const availableBookingTimeList = ref<TAvailableBookingTimeList>([])
    const eventsUnitToBookList = ref<TEventUnitsToBookList>([])
    const venueInfo = ref<TVenueFromEventUnitsToBookRes>({
      venueId: 0,
      title: "",
      location: "",
      description: "",
      address: "",
      images: [],
    })
    //booking date time initialized with current date, will be set when user select date, time, am/pm and duration
    const bookingDateTime = ref<Date>(formData.value.selectedDate)

    const initStore = async (venueId: number) => {
      if (venueIdToBook.value === venueId) {
        return
      }

      venueIdToBook.value = venueId

      await getEventCategoriesOfVenue(venueId)
    }

    const getEventCategoriesOfVenue = async (venueId: number) => {
      try {
        fetchEventCategoriesStatus.value = "loading"
        const eventCategories = await fetchEventCategoriesOfVenue(venueId)
        eventCategoryList.value = eventCategories

        if (!eventCategories.length) {
          throw new HandledError("empty-event-categories")
        }

        dispatchSelectItemEvent({
          type: "event-category",
          payload: eventCategories[0].id,
        })
      } catch (error) {
        throw error
      } finally {
        fetchEventCategoriesStatus.value = "none"
      }
    }

    const initAvailableBookingTimeAndDuration = async () => {
      if (!formData.value.selectedCategory) {
        throw new HandledError("category-not-selected")
      }

      if (!venueIdToBook.value) {
        throw new HandledError("no-venue-id")
      }

      try {
        fetchInitBookingTimeAndDurationStatus.value = "loading"

        const bookingTimeList = await fetchAvailableBookingTimeList(
          venueIdToBook.value,
          formData.value.selectedCategory,
          dayjs(formData.value.selectedDate).toJSON()
        )

        if (!bookingTimeList.length) {
          throw new HandledError("empty-booking-time-list")
        }

        availableBookingTimeList.value = bookingTimeList

        fetchInitBookingTimeAndDurationStatus.value = "fetched"
      } catch (error) {
        fetchInitBookingTimeAndDurationStatus.value = "none"
        throw error
      }
    }

    const setEventUnitsToBook = async () => {
      try {
        fetchEventUnitsToBookStatus.value = "loading"
        if (!venueIdToBook.value || !formData.value.selectedCategory) {
          return
        }

        const startDatetime = getTransformedBookingDateTime(
          formData.value.selectedDate,
          formData.value.selectedTime,
          formData.value.selectedAmPm
        )

        bookingDateTime.value = startDatetime

        const eventUnitsToBookRes = await fetchEventUnitsToBook({
          venueId: venueIdToBook.value,
          eventCategoryId: formData.value.selectedCategory,
          startDatetime,
          duration: formData.value.selectedDuration,
        })

        eventsUnitToBookList.value =
          eventUnitsToBookRes.availableEventUnitsToBook

        venueInfo.value = eventUnitsToBookRes.venue

        fetchEventUnitsToBookStatus.value = "fetched"
      } catch (error) {
        fetchEventUnitsToBookStatus.value = "none"
        throw error
      }
    }

    const reducer = ({ type, payload }: TDispatchSelectItemEventProps) => {
      switch (type) {
        case "date":
          return {
            formData: {
              selectedDate: payload,
              selectedTime: INITIAL_FORM_DATA.selectedTime,
              selectedAmPm: INITIAL_FORM_DATA.selectedAmPm,
              selectedDuration: INITIAL_FORM_DATA.selectedDuration,
            },
            availableBookingTimeList: [],
            eventsUnitToBookList: [],
          }
        case "event-category":
          return {
            formData: {
              selectedCategory: payload,
              selectedTime: INITIAL_FORM_DATA.selectedTime,
              selectedAmPm: INITIAL_FORM_DATA.selectedAmPm,
              selectedDuration: INITIAL_FORM_DATA.selectedDuration,
            },
            availableBookingTimeList: [],
            eventsUnitToBookList: [],
          }
        case "time":
          return {
            formData: {
              selectedTime: payload,
              selectedAmPm: INITIAL_FORM_DATA.selectedAmPm,
              selectedDuration: INITIAL_FORM_DATA.selectedDuration,
            },
            eventsUnitToBookList: [],
          }
        case "amPm":
          return {
            formData: {
              selectedAmPm: payload,
              selectedDuration: INITIAL_FORM_DATA.selectedDuration,
            },
            eventsUnitToBookList: [],
          }
        case "duration":
          return {
            formData: { selectedDuration: payload },
            eventsUnitToBookList: [],
          }
        default:
          throw new Error("invalid props is passed to reducer!")
      }
    }

    const dispatchSelectItemEvent = async (
      props: TDispatchSelectItemEventProps
    ) => {
      const stateToUpdate = reducer(props)

      formData.value = { ...formData.value, ...stateToUpdate.formData }

      eventsUnitToBookList.value = stateToUpdate.eventsUnitToBookList

      if (stateToUpdate.availableBookingTimeList) {
        availableBookingTimeList.value = stateToUpdate.availableBookingTimeList
      }

      /** if selectedCategory and selectedDate has value, fetch for booking time and durations */
      if (
        stateToUpdate.formData.selectedCategory ||
        stateToUpdate.formData.selectedDate
      ) {
        await initAvailableBookingTimeAndDuration()
      }

      //refetch event units if all values in form is available
      if (stateToUpdate.formData.selectedDuration) {
        await setEventUnitsToBook()
      }
    }

    const resetStore = () => {
      formData.value = { ...INITIAL_FORM_DATA }
    }

    return {
      initStore,
      dispatchSelectItemEvent,
      formData,
      eventCategoryList,
      availableBookingTimeList,
      eventsUnitToBookList,
      fetchInitBookingTimeAndDurationStatus,
      fetchEventUnitsToBookStatus,
      resetStore,
      venueIdToBook,
      venueInfo,
      bookingDateTime,
    }
  })

export const useNewBookVenueStore = createBookVenueStore({
  fetchAvailableBookingTimeList,
  fetchEventCategoriesOfVenue,
  fetchEventUnitsToBook,
})
