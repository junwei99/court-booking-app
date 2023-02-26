import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { getAvailableTimeslotsService } from "@/modules/bookings/services/bookings.services"
import type { Request, Response } from "express"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import dayjs from "dayjs"

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

  if (!startDatetime) {
    throw new HandledError("Invalid startDatetime")
  }

  const availableTimeslots = await getAvailableTimeslotsService(
    parseInt(venueId),
    parseInt(eventCategoryId),
    new Date(startDatetime)
  )

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ outputTimeList: availableTimeslots })
}

export const createBookings = async (req: Request, res: Response) => {}
