export type TBookingParam = {
  bookingStartDate: Date
  duration: number
  eventUnitId: number
}

export type TBookingDetails = {
  totalAmount: number
  guestFirstName?: string
  guestLastName?: string
  guestEmail?: string
  venueId: number
}

export type TCreateBookingsParams = {
  bookingList: Array<TBookingParam>
} & TBookingDetails
