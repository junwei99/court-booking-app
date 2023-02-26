import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import {
  createBookingsService,
  getAvailableTimeslotsService,
} from "@/modules/bookings/services/bookings.services"
import type { Request, Response } from "express"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import { IInsertBookingsParams } from "@/modules/bookings/queries/insert-bookings/insert-bookings.queries"

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

export const createBookings = async (
  req: Request<{}, {}, IInsertBookingsParams>,
  res: Response
) => {
  const { bookingList } = req.body

  if (!bookingList || !bookingList?.length) {
    throw new HandledError("Invalid bookingList")
  }

  if (bookingList?.length < 1) {
    throw new HandledError("Empty bookingList")
  }

  const createdBookingIds = await createBookingsService(bookingList)

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes(
    { createdBookingIds },
    "Bookings created succesfully"
  )
}
