import type { TGuestDetails } from "./booking-params.types"

export type TDurations =
  | "30 minutes"
  | "1 hour"
  | "1 hour 30 minutes"
  | "2 hours"

export interface IDuration {
  key: TDurations
  value: string
}
export interface IOutputTime {
  time: string
  amOrPm: {
    am: IAmPmObj
    pm: IAmPmObj
  }
}

export interface IAmPmObj {
  isAvailable: boolean
  durations: Array<IDuration>
}

export interface IFetchAvailableEventUnitsToBookRes {
  availableEventUnitsToBook: Array<{
    eventUnitId: number
    venueName: string
    price: number
    eventCategoryName: string
  }>
}

export interface IBookingRes {
  createdBookingIds: Array<{
    id: number
  }>
}

export type TBookingRes = TGuestDetails & {
  bookingId: string
  venueId: number
  venueName: string
  eventUnitName: string
  totalAmount: number
}
