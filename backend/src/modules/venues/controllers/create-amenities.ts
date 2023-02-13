import express from "express"
import { createAmenitiesService } from "@/modules/venues/services/venues.services"
import { ApiError } from "@/utils/ApiError"

export const createAmenityCtrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { amenityList }: { amenityList: Array<{ name: string }> } = req.body

    const insertAmenitiesToDBRes = await createAmenitiesService(amenityList)

    return res.json({ msg: "amenities successfully created" })
  } catch (error) {
    return next(ApiError.badRequest("oops, an error occurred"))
  }
}
