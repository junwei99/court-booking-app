import type {
  IGetEventCategoriesOfVenueParams,
  IGetEventCategoriesOfVenueRes,
} from "@/modules/book-venue/types/api"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"

export const fetchEventCategoriesOfVenue = async (venueId: string) => {
  const params = {
    venueId,
  }
  const eventCategoryRes = await Requestor.get<
    IGetEventCategoriesOfVenueRes,
    IGetEventCategoriesOfVenueParams
  >(EApiKeys.EVENT_CATEGORIES_OF_VENUE, params, venueId)

  if (
    !eventCategoryRes?.status ||
    eventCategoryRes?.status !== "success" ||
    !eventCategoryRes?.eventCategoryList?.length
  ) {
    throw new Error(eventCategoryRes.message)
  }

  return eventCategoryRes.eventCategoryList
}
