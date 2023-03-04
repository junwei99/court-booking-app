export interface IVenueListRes extends ISuccessRes {
  venueList: Array<{
    id: number
    title: string
    eventCategories: Array<string>
    priceRange: { min: number; max: number }
    location: string
    image: string
  }>
}
