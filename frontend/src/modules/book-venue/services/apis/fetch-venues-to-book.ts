import { EApiKeys } from "@/others/constants/api-keys.constants"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import type { IEventUnitItem } from "@/modules/common/types/venue.types"

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
  // await new Promise(function (resolve) {
  //   setTimeout(resolve, 500)
  // })

  const params = {
    venueId,
    eventCategoryId,
    startDatetime,
    duration,
  }

  console.log("fetching")

  const venuesToBookRes = await Requestor.get<
    Array<IEventUnitItem>,
    IFetchAvailableEventUnitsToBookParams
  >(EApiKeys.AVAILABLE_EVENT_UNITS_TO_BOOK, params)

  console.log({ venuesToBookRes })

  return venuesToBookRes
}
