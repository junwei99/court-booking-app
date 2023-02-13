import { EApiKeys } from "@/others/constants/api-keys.constants"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import type { IGetEventCategoriesOfVenueParams } from "@/modules/book-venue/types/api"
import type { TCategory } from "@/modules/book-venue/types/components/book-venue.types"

export const fetchEventCategoriesOfVenue = async (venueId: string) => {
  const params = {
    venueId,
  }
  const eventCategoryRes = await Requestor.get<
    Array<TCategory>,
    IGetEventCategoriesOfVenueParams
  >(EApiKeys.EVENT_CATEGORIES_OF_VENUE, params, venueId)

  return eventCategoryRes
}
