import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { queryBookingsService } from "@/modules/bookings/services/bookings.services"
import { Request, Response } from "express"
import { HandledError } from "@/modules/common/utils/HandledError.utils"

type TFetchAvailableTimeSlotsQuery = {
  venueId?: string
  eventCategoryId?: string
  startDatetime?: string
}

export const fetchAvailableTimeslots = async (
  req: Request<{}, {}, {}, TFetchAvailableTimeSlotsQuery>,
  res: Response
) => {
  const { venueId, eventCategoryId, startDatetime } = req.query

  if (
    !venueId ||
    !(parseInt(venueId) > 0) ||
    !eventCategoryId ||
    !(parseInt(eventCategoryId) > 0)
  ) {
    throw new HandledError("Invalid venueId or eventCategoryId")
  }

  const bookingList = await queryBookingsService(
    parseInt(venueId),
    parseInt(eventCategoryId)
  )

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ bookingList }, "booking list")
}
