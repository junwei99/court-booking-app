export interface IVenueItem {
  locationBookingId: string
  locationId: string
  title: string
  category: string
  price: number
}

export interface IEventUnitItem {
  eventUnitId: number
  venueName: string
  price: number
  eventCategoryName: string
}
