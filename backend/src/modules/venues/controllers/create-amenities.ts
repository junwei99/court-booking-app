import express from "express"
import { createAmenitiesService } from "@/modules/venues/services/venues.services"
import { TReqBody } from "@/modules/common/types/common.types"

export const createAmenityCtrl = async (
  req: TReqBody<{ amenityList: Array<{ name: string }> }>,
  res: express.Response,
  next: express.NextFunction
) => {
  const { amenityList } = req.body

  await createAmenitiesService(amenityList)

  return res.json({ message: "amenities successfully created" })
}
