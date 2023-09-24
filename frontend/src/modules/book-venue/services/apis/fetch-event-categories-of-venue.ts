import type { IGetEventCategoriesOfVenueParams } from "@/modules/book-venue/types/api"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { HandledError } from "@/modules/common/utils/custom-error.utils"
import { validateResponse } from "@/modules/common/utils/response-validator.utils"
import { EApiKeys } from "@/others/constants/api-keys.constants"
import { number, object, string, type infer as TInfer } from "zod"

const eventCategoriesOfVenueResSchema = object({
  eventCategoryList: object({
    id: number(),
    name: string(),
    type: string(),
  }).array(),
})

type TEventCategoriesOfVenueRes = TInfer<typeof eventCategoriesOfVenueResSchema>

export type TEventCategories = TEventCategoriesOfVenueRes["eventCategoryList"]

export const fetchEventCategoriesOfVenue = async (venueId: number) => {
  const params = {
    venueId,
  }
  const eventCategoryRes = await Requestor.get<
    TEventCategoriesOfVenueRes,
    IGetEventCategoriesOfVenueParams
  >(EApiKeys.EVENT_CATEGORIES_OF_VENUE, params, venueId)

  const validatedEventCategoryRes = validateResponse(
    eventCategoryRes,
    eventCategoriesOfVenueResSchema
  )

  if (!validatedEventCategoryRes.success) {
    throw new HandledError("response-doesnt-match-schema")
  }

  return validatedEventCategoryRes.data.eventCategoryList
}
