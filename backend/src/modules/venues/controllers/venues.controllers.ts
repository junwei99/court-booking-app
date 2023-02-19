import { NextFunction, Request, Response } from "express"
import {
  getVenueListService,
  getVenueByIdService,
  createVenueService,
  createAmenitiesService,
} from "@/modules/venues/services/venues.services"
import { TReqBody } from "@/modules/common/types/common.types"
import { IInsertVenueParams } from "@/modules/venues/queries/create-venues/create-venues.queries"
import { API_STATUS_CODES } from "@/modules/common/constants/apis.constants"

export const fetchVenuesCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const venueList = await getVenueListService()

  res.json(venueList)
}

export const fetchVenueByIdCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { venueId } = req.params

  const venue = await getVenueByIdService(parseInt(venueId))

  res.json(venue)
}

export const createVenueCrl = async (
  req: TReqBody<IInsertVenueParams>,
  res: Response,
  next: NextFunction
) => {
  const { socialMedia } = req.body

  const jsonSocialMedia = JSON.stringify(
    socialMedia as Array<{ type: string; link: string }>
  )

  const createVenueServiceBody = { ...req.body, socialMedia: jsonSocialMedia }

  const createdVenue = createVenueService(createVenueServiceBody)

  return res.json(createdVenue)
}

export const createAmenityCtrl = async (
  req: TReqBody<{ amenityList: Array<{ name: string }> }>,
  res: Response,
  next: NextFunction
) => {
  const { amenityList } = req.body

  await createAmenitiesService(amenityList)

  return res.json({
    status: API_STATUS_CODES.SUCCESS,
    message: "amenities successfully created",
  })
}
