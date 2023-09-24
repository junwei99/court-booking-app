import type { IGetAvailableTimeslotsParams } from "@/modules/book-venue/types/api"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { HandledError } from "@/modules/common/utils/custom-error.utils"
import { validateResponse } from "@/modules/common/utils/response-validator.utils"
import { EApiKeys } from "@/others/constants/api-keys.constants"
import { boolean, number, object, string, type infer as zodInfer } from "zod"

const amPmObjSchema = object({
  isAvailable: boolean(),
  durations: object({
    key: string(),
    value: number(),
  }).array(),
})

const availableBookingTimeListResSchema = object({
  outputTimeList: object({
    time: string(),
    amOrPm: object({
      am: amPmObjSchema,
      pm: amPmObjSchema,
    }),
  }).array(),
})

type TAvailableBookingTimeListRes = zodInfer<
  typeof availableBookingTimeListResSchema
>

export type TAvailableBookingTimeList =
  TAvailableBookingTimeListRes["outputTimeList"]

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
    TAvailableBookingTimeListRes,
    IGetAvailableTimeslotsParams
  >(EApiKeys.GET_AVAILABLE_TIMESLOTS, params)

  const validatedAvailableBookingTimeListRes = validateResponse(
    availableBookingTimeListRes,
    availableBookingTimeListResSchema
  )

  if (!validatedAvailableBookingTimeListRes.success) {
    throw new HandledError("response-doesnt-match-schema")
  }

  return validatedAvailableBookingTimeListRes.data.outputTimeList
}
