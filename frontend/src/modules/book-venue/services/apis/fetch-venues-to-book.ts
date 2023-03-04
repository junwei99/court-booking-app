import type { IFetchAvailableEventUnitsToBookRes } from "@/modules/book-venue/types/api"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"

interface IFetchAvailableEventUnitsToBookParams {
  venueId: number | string
  eventCategoryId: number | string
  startDatetime: Date
  duration: number
}

export const fetchVenuesToBook = async (
  venueId: number | string,
  eventCategoryId: number,
  startDatetime: Date,
  duration: number
) => {
  const body = {
    venueId,
    eventCategoryId,
    startDatetime,
    duration,
  }

  const eventUnitsToBookRes = await Requestor.post<
    IFetchAvailableEventUnitsToBookRes,
    IFetchAvailableEventUnitsToBookParams
  >(EApiKeys.AVAILABLE_EVENT_UNITS_TO_BOOK, body)

  if (
    !(eventUnitsToBookRes?.status === "success") ||
    !eventUnitsToBookRes?.availableEventUnitsToBook?.length
  ) {
    throw new Error(eventUnitsToBookRes.message)
  }

  return eventUnitsToBookRes.availableEventUnitsToBook
}
