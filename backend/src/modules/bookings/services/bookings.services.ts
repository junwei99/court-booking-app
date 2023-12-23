import { client } from '@/index'
import { insertBookings } from '@/modules/bookings/queries/insert-booking/insert-booking.queries'
import { insertBookingItems } from '@/modules/bookings/queries/insert-bookings-items/insert-bookings-items.queries'
import { queryAvailableEventUnitsToBook } from '@/modules/bookings/queries/query-available-event-units-to-book/query-available-event-units-to-book.queries'
import { queryBookings } from '@/modules/bookings/queries/query-bookings/query-bookings.queries'
import {
  getFilteredIntervalDateList,
  getIntervalDateList,
  getTransformedTimeslots,
} from '@/modules/bookings/services/get-available-timeslots'
import { TBookingParam } from '@/modules/bookings/types/bookings-controllers.types'
import { TBookingList } from '@/modules/bookings/types/bookings-services.types'
import { HandledError } from '@/modules/common/utils/HandledError.utils'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { queryBooking } from '../queries/query-booking/query-booking.queries'

dayjs.extend(isBetween)

export const getAvailableTimeslotsService = async (
  venueId: number,
  eventCategoryId: number,
  startDatetime: Date
) => {
  const bookingItemList = await queryBookings.run(
    { venueId, eventCategoryId },
    client
  )

  //TODO: make this dynamic instead of hardcode
  const intervalMin = 30

  const intervalDateList = getIntervalDateList(
    dayjs(startDatetime).startOf('day').toDate(),
    intervalMin
  )

  //filter out dates that are unbookable
  const bookableIntervalDateList = getFilteredIntervalDateList(
    intervalDateList,
    bookingItemList
  )

  //transform timeslots to { time: string, amOrPm: { am: boolean, pm: boolean } } structure
  const transformedTimeslots = getTransformedTimeslots(
    bookableIntervalDateList,
    intervalDateList,
    intervalMin
  )

  return transformedTimeslots
}

export const createBookingService = async (bookingList: TBookingList) => {
  const createdBookingIds = await insertBookings.run({ bookingList }, client)
  return createdBookingIds
}

export const createBookingItemsService = async (
  bookingItemList: Array<TBookingParam>,
  bookingId: string
) => {
  const processedBookingList = bookingItemList.map((booking) => {
    const { bookingStartDate, duration, eventUnitId } = booking
    return {
      bookingStartDate,
      bookingEndDate: dayjs(bookingStartDate).add(duration, 'minute').toDate(),
      eventUnitId,
      bookingId,
    }
  })

  const createdBookingIds = await insertBookingItems.run(
    { bookingItemList: processedBookingList },
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
    throw new HandledError('Invalid params provided.')
  }

  const bookingEndDatetime = bookingStartDtDayjs
    .add(minutesDuration, 'minute')
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

  if (!availableEventUnits.length || availableEventUnits.length < 1) {
    return {
      availableEventUnitsToBook: bookableEventUnitsOutput,
    }
  }

  const {
    venue_title,
    venue_id,
    venue_description,
    venue_address,
    venue_images,
    location_name,
  } = availableEventUnits[0] ?? {}

  return {
    venue: {
      title: venue_title,
      venueId: venue_id,
      location: location_name,
      description: venue_description,
      address: venue_address,
      images: venue_images,
    },
    availableEventUnitsToBook: bookableEventUnitsOutput,
  }
}

export const getBookingService = async (bookingId: string) => {
  const bookings = await queryBooking.run({ bookingId }, client)

  if (!bookings || bookings.length <= 0) {
    throw new HandledError('Booking not found')
  }

  const totalAmount = bookings.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price
  }, 0)

  const [booking] = bookings

  return {
    bookingId,
    guestFirstName: booking.guest_first_name,
    guestLastName: booking.guest_last_name,
    guestEmail: booking.guest_email,
    venueId: booking.venue_id,
    venueName: booking.venue_name,
    totalAmount,
  }
}
