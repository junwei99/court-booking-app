import { client } from "@/index"
import { insertBookings } from "@/modules/bookings/queries/insert-bookings/insert-bookings.queries"
import { queryAvailableEventUnitsToBook } from "@/modules/bookings/queries/query-available-event-units-to-book/query-available-event-units-to-book.queries"
import { queryBookings } from "@/modules/bookings/queries/query-bookings/query-bookings.queries"
import {
  getFilteredIntervalDateList,
  getIntervalDateList,
  getTransformedTimeslots,
} from "@/modules/bookings/services/get-available-timeslots"
import {
  TBookingParam,
  TGuestDetails,
} from "@/modules/bookings/types/bookings-controllers.types"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

export const getAvailableTimeslotsService = async (
  venueId: number,
  eventCategoryId: number,
  startDatetime: Date
) => {
  const bookingList = await queryBookings.run(
    { venueId, eventCategoryId },
    client
  )

  //TODO: make this dynamic instead of hardcode
  const intervalMin = 30

  const intervalDateList = getIntervalDateList(
    dayjs(startDatetime).startOf("day").toDate(),
    intervalMin
  )

  //filter out dates that are unbookable
  const bookableIntervalDateList = getFilteredIntervalDateList(
    intervalDateList,
    bookingList
  )

  //transform timeslots to { time: string, amOrPm: { am: boolean, pm: boolean } } structure
  const transformedTimeslots = getTransformedTimeslots(
    bookableIntervalDateList,
    intervalDateList,
    intervalMin
  )

  return transformedTimeslots
}

export const createBookingsService = async (
  bookingList: Array<TBookingParam>,
  guestDetails?: TGuestDetails
) => {
  const processedBookingList = bookingList.map((booking) => {
    const { bookingStartDate, duration, eventUnitId } = booking
    return {
      bookingStartDate,
      bookingEndDate: dayjs(bookingStartDate).add(duration, "minute").toDate(),
      eventUnitId,
      guestFirstName: guestDetails?.guestFirstName ?? null,
      guestLastName: guestDetails?.guestLastName ?? null,
      guestEmail: guestDetails?.guestEmail ?? null,
    }
  })

  const createdBookingIds = await insertBookings.run(
    { bookingList: processedBookingList },
    client
  )

  return createdBookingIds
}

export const getAvailableEventUnitsToBookService = async (
  venueId: number,
  eventCategoryId: number,
  bookingStartDatetime: Date,
  minutesDuration: number
) => {
  const bookingStartDtDayjs = dayjs(bookingStartDatetime)

  if (
    ![
      venueId,
      eventCategoryId,
      bookingStartDtDayjs.isValid(),
      minutesDuration,
    ].every(Boolean)
  ) {
    throw new HandledError("Invalid params provided.")
  }

  const bookingEndDatetime = bookingStartDtDayjs
    .add(minutesDuration, "minute")
    .toDate()

  const availableEventUnits = await queryAvailableEventUnitsToBook.run(
    { venueId, eventCategoryId, bookingStartDatetime, bookingEndDatetime },
    client
  )

  const bookableEventUnitsOutput = availableEventUnits.map((eventUnit) => {
    const { id, name, price, event_category_name } = eventUnit

    return {
      eventUnitId: id,
      venueName: name,
      price,
      eventCategoryName: event_category_name,
    }
  })

  return bookableEventUnitsOutput
}
