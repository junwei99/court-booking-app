import {
  createBookingItemsService,
  createBookingService,
  getAvailableEventUnitsToBookService,
  getAvailableTimeslotsService,
} from "@/modules/bookings/services/bookings.services"
import { TCreateBookingsParams } from "@/modules/bookings/types/bookings-controllers.types"
import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import { HandledError } from "@/modules/common/utils/HandledError.utils"
import type { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"

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
  const {
    bookingList,
    totalAmount,
    guestFirstName = "",
    guestLastName = "",
    guestEmail = "",
    venueId,
  } = req.body

  if (
    !bookingList ||
    !bookingList?.length ||
    bookingList?.length < 1 ||
    !totalAmount ||
    !venueId
  ) {
    throw new HandledError("Invalid parameters")
  }

  const createdBookingIds = await createBookingService([
    {
      id: uuidv4(),
      totalAmount: totalAmount.toString(),
      guestFirstName,
      guestLastName,
      guestEmail,
      venueId,
    },
  ])

  if (!createdBookingIds || createdBookingIds.length <= 0) {
    throw new HandledError("Failed to create booking")
  }

  const createdBookingItemIds = await createBookingItemsService(
    bookingList,
    createdBookingIds[0].id
  )

  if (!createdBookingItemIds || createdBookingItemIds.length <= 0) {
    throw new HandledError("Failed to create booking items")
  }

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
