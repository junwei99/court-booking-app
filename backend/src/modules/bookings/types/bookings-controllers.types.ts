export type TBookingParam = {
  bookingStartDate: Date
  duration: number
  eventUnitId: number
}

export type TGuestDetails = Partial<{
  guestFirstName: string
  guestLastName: string
  guestEmail: string
}>

export type TCreateBookingsParams = {
  bookingList: Array<TBookingParam>
} & TGuestDetails
