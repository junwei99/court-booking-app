import { client } from "@/index"
import { queryBookings } from "@/modules/bookings/queries/query-bookings/query-bookings.queries"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import {
  getFilteredIntervalDateList,
  getIntervalDateList,
  getTransformedTimeslots,
} from "@/modules/bookings/services/get-available-timeslots"
import {
  type IInsertBookingsParams,
  insertBookings,
} from "@/modules/bookings/queries/insert-bookings/insert-bookings.queries"

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
  bookingList: IInsertBookingsParams["bookingList"]
) => {
  const createdBookingIds = await insertBookings.run({ bookingList }, client)

  return createdBookingIds
}
