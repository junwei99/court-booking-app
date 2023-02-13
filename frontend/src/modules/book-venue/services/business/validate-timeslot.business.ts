import type { IEventUnitItem } from "@/modules/common/types/venue.types"
import dayjs from "dayjs"

type TEventUnitListToDisplay = {
  id: string
  eventUnitName: string
  bookingTimeFrame: string
  bookingStartTime: dayjs.Dayjs
  bookingEndTime: dayjs.Dayjs
  price: number
}

export const getIsTimeslotInCart = (
  eventUnitItemList: Array<{
    eventUnit: IEventUnitItem
    bookingDatetime: Date
    duration: number
  }>,
  eventUnitId: number,
  bookingDatetime: Date,
  duration: number
) =>
  eventUnitItemList.some((eventUnitItem) => {
    if (
      eventUnitItem.bookingDatetime.getTime() === bookingDatetime.getTime() &&
      eventUnitItem.eventUnit.eventUnitId === eventUnitId
    ) {
      return true
    }

    if (eventUnitItem.eventUnit.eventUnitId !== eventUnitId) {
      return false
    }

    const startDatetime = dayjs(eventUnitItem.bookingDatetime)
    const endDatetime = dayjs(eventUnitItem.bookingDatetime).add(
      eventUnitItem.duration,
      "minute"
    )

    const endBookingDatetime = dayjs(bookingDatetime).add(duration, "minute")

    return (
      dayjs(bookingDatetime).isBetween(startDatetime, endDatetime) ||
      endBookingDatetime.isBetween(startDatetime, endDatetime)
    )
  })

export const getSortedCartDisplayList = (
  cartItemsDisplayList: Array<TEventUnitListToDisplay>
) => {
  return cartItemsDisplayList.sort((a, b) => {
    if (dayjs(a.bookingStartTime).isSame(b.bookingStartTime)) {
      if (dayjs(a.bookingEndTime).isAfter(b.bookingEndTime)) {
        return 1
      } else if (dayjs(a.bookingEndTime).isSame(b.bookingEndTime)) {
        return 0
      }

      return -1
    }

    if (dayjs(a.bookingStartTime).isAfter(b.bookingStartTime)) {
      return 1
    } else if (dayjs(a.bookingStartTime).isSame(b.bookingStartTime)) {
      return 0
    }
    return -1
  })
}
