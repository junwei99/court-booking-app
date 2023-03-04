export interface IVenueRes extends ISuccessRes {
  venue: {
    id: number
    title: string
    address: string
    description: string
    images: Array<string>
    priceRange: {
      min: number
      max: number
    }
    contactUsInfo: {
      phoneNum: string
      website: string
      socialMedia: Array<{
        link: string
        type: string
      }>
    }
    amenities: Array<{
      id: number
      name: string
    }>
    eventCategories: Array<string>
  }
}
