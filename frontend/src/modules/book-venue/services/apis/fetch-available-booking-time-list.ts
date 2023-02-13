import { EApiKeys } from "@/others/constants/api-keys.constants"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import type {
  IGetAvailableTimeslotsParams,
  IOutputTime,
} from "@/modules/book-venue/types/api"

export const fetchAvailableBookingTimeList = async (
  venueId: number,
  eventCategoryId: number,
  startDatetime: string
) => {
  const params = {
    venueId,
    eventCategoryId,
    startDatetime,
  }

  const availableBookingTimeListRes = await Requestor.get<
    { outputTimeList: Array<IOutputTime> },
    IGetAvailableTimeslotsParams
  >(EApiKeys.GET_AVAILABLE_TIMESLOTS, params)

  return availableBookingTimeListRes
}
