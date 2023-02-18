import express from "express"
import { ApiError } from "@/utils/ApiError"

interface IEventUnitReq {
  name: string
  price: number
  venueId: number
  eventCategoryId: number
}

export const createEventUnitsCtrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { eventUnitList }: { eventUnitList: Array<IEventUnitReq> } = req.body
}
