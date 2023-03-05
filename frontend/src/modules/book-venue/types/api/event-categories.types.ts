import type { TCategory } from "@/modules/book-venue/types/components/book-venue.types"

export interface IGetEventCategoriesOfVenueParams {
  venueId: number
}

export interface IGetEventCategoriesOfVenueRes extends ISuccessRes {
  eventCategoryList: Array<TCategory>
}
