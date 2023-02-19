import { NextFunction, Response } from "express"
import { TReqBody } from "@/modules/common/types/common.types"
import { eventUnitServices } from "@/modules/event-units/services/event-units.services"
import { TCreateEventUnitsParam } from "@/modules/event-units/types/event-units.types"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"
import { HandledError } from "@/modules/common/utils/ValidationError.utils"

//TODO: wrong req type, it is using snake case, should use camel case
export const createEventUnitsCtrl = async (
  req: TReqBody<TCreateEventUnitsParam>,
  res: Response,
  next: NextFunction
) => {
  const createEventUnitsParam = req.body

  //TODO: should convert the ids to number first
  const createdEventUnitIds = await eventUnitServices.createEventUnits(
    createEventUnitsParam
  )

  if (createdEventUnitIds.length > 0) {
    res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: "Event units created successfully",
      createEventUnitIdList: createdEventUnitIds,
    })
  }

  throw new HandledError("Event units creation failed")
}
