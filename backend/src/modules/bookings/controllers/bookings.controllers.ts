import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"
import {
  getFilteredIntervalDateList,
  getIntervalDateList,
  getTransformedTimeslots,
  queryBookingsService,
} from "@/modules/bookings/services/bookings.services"
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

  const bookingList = await queryBookingsService(
    parseInt(venueId),
    parseInt(eventCategoryId)
  )

  const startDatetimeObj = new Date(startDatetime)

  //TODO: make this dynamic instead of hardcode
  const intervalMin = 30

  const intervalDateList = getIntervalDateList(
    dayjs(startDatetimeObj).startOf("day").toDate(),
    intervalMin
  )

  //filter out dates that are unbookable
  const bookableIntervalDateList = getFilteredIntervalDateList(
    intervalDateList,
    bookingList
  )

  //transform timeslots to { time: string, amOrPm: { am: boolean, pm: boolean } } structure
  const transformedTimeslots = getTransformedTimeslots(
    bookableIntervalDateList,
    intervalDateList,
    intervalMin
  )

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ outputTimeList: transformedTimeslots })
}
