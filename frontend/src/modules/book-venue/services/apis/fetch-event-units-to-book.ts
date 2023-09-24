import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { HandledError } from "@/modules/common/utils/custom-error.utils"
import { validateResponse } from "@/modules/common/utils/response-validator.utils"
import { EApiKeys } from "@/others/constants/api-keys.constants"
import { number, object, string, type infer as TInfer } from "zod"

type TFetchAvailableEventUnitsToBookParams = {
  venueId: number
  eventCategoryId: number
  startDatetime: Date
  duration: number
}

const eventUnitsToBookResSchema = object({
  availableEventUnitsToBook: object({
    eventUnitId: number(),
    venueName: string(),
    price: number(),
    eventCategoryName: string(),
  }).array(),
  venue: object({
    venueId: number(),
    title: string(),
    location: string(),
    description: string(),
    address: string(),
    images: string().array(),
  }),
})

export type TEventUnitsToBookRes = TInfer<typeof eventUnitsToBookResSchema>

export type TEventUnitsToBookList =
  TEventUnitsToBookRes["availableEventUnitsToBook"]

export type TVenueFromEventUnitsToBookRes = TEventUnitsToBookRes["venue"]

export const fetchEventUnitsToBook = async (
  props: TFetchAvailableEventUnitsToBookParams
) => {
  const eventUnitsToBookRes = await Requestor.post<
    TEventUnitsToBookRes,
    TFetchAvailableEventUnitsToBookParams
  >(EApiKeys.AVAILABLE_EVENT_UNITS_TO_BOOK, props)

  const validatedEventUnitsToBookRes = validateResponse(
    eventUnitsToBookRes,
    eventUnitsToBookResSchema
  )

  if (!validatedEventUnitsToBookRes.success) {
    throw new HandledError("response-doesnt-match-schema")
  }

  return validatedEventUnitsToBookRes.data
}
