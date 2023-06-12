export interface IGetAvailableTimeslotsParams {
  venueId: number
  eventCategoryId: number
  startDatetime: string
}

export type TBooking = {
  bookingStartDate: Date
  duration: number
  eventUnitId: number
}

export type TGuestDetails = {
  guestFirstName?: string
  guestLastName?: string
  guestEmail?: string
}

export type TCreateBookingParams = {
  bookingList: TBooking[]
} & TGuestDetails
