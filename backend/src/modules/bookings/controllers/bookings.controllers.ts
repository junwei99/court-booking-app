import { IInsertBookingsParams } from "@/modules/bookings/queries/insert-bookings/insert-bookings.queries"
import {
  createBookingsService,
  getAvailableEventUnitsToBookService,
  getAvailableTimeslotsService,
} from "@/modules/bookings/services/bookings.services"
import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import type { Request, Response } from "express"

type TFetchAvailableTimeSlotsQuery = {
  venueId?: string
  eventCategoryId?: string
  startDatetime?: string
}

type TFetchAvailableEventUnitsToBook = {
  venueId: number
  eventCategoryId: number
  startDatetime: string
  duration: number
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

export const fetchAvailableEventUnitsToBook = async (
  req: Request<{}, {}, TFetchAvailableEventUnitsToBook>,
  res: Response
) => {
  const { venueId, eventCategoryId, startDatetime, duration } = req.body

  if (![venueId, eventCategoryId, startDatetime, duration].every(Boolean)) {
    throw new HandledError("Invalid parameters")
  }

  const availableEventUnitsToBook = await getAvailableEventUnitsToBookService(
    venueId,
    eventCategoryId,
    new Date(startDatetime),
    duration
  )

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ availableEventUnitsToBook })
}
