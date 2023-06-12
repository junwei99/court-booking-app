import {
  createBookingsService,
  getAvailableEventUnitsToBookService,
  getAvailableTimeslotsService,
} from "@/modules/bookings/services/bookings.services"
import { TCreateBookingsParams } from "@/modules/bookings/types/bookings-controllers.types"
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
  req: Request<{}, {}, TCreateBookingsParams>,
  res: Response
) => {
  const { bookingList, guestEmail, guestFirstName, guestLastName } = req.body

  if (!bookingList || !bookingList?.length || bookingList?.length < 1) {
    throw new HandledError("Invalid or empty bookingList")
  }

  const createdBookingIds = await createBookingsService(bookingList, {
    guestEmail,
    guestFirstName,
    guestLastName,
  })

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
