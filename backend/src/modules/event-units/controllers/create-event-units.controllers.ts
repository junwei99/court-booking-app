import { NextFunction, Response } from "express"
import { TReqBody } from "@/modules/common/types/common.types"
import { eventUnitServices } from "@/modules/event-units/services/event-units.services"
import { IInsertEventUnitsParams } from "@/modules/event-units/queries/create-event-units.queries"

//TODO: wrong req type, it is using snake case, should use camel case
export const createEventUnitsCtrl = async (
  req: TReqBody<IInsertEventUnitsParams>,
  res: Response,
  next: NextFunction
) => {
  const { eventUnitList } = req.body

  //TODO: should convert the ids to number first
  const output = eventUnitServices.createEventUnits(req.body)

  res.json(output)
}
