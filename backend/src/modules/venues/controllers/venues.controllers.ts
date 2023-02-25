import { Request, Response } from "express"
import {
  getVenueListService,
  getVenueByIdService,
  createVenueService,
  createAmenitiesService,
} from "@/modules/venues/services/venues.services"
import { IInsertVenueParams } from "@/modules/venues/queries/create-venues/create-venues.queries"
import { ApiRes } from "@/modules/common/utils/ApiResponse.utils"

export const fetchVenuesCtrl = async (req: Request, res: Response) => {
  const venueList = await getVenueListService()

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ venueList }, "Venue list fetched successfully")
}

export const fetchVenueByIdCtrl = async (
  req: Request<{ venueId: string }>,
  res: Response
) => {
  const { venueId } = req.params

  const venue = await getVenueByIdService(parseInt(venueId))

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ venue }, "Venue fetched successfully")
}

export const createVenueCrl = async (
  req: Request<{}, {}, IInsertVenueParams>,
  res: Response
) => {
  const { socialMedia } = req.body

  const jsonSocialMedia = JSON.stringify(
    socialMedia as Array<{ type: string; link: string }>
  )

  const createVenueServiceBody = { ...req.body, socialMedia: jsonSocialMedia }

  const createdVenue = await createVenueService(createVenueServiceBody)

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes({ createdVenue }, "Venue created successfully")
}

export const createAmenityCtrl = async (
  req: Request<{}, {}, { amenityList: Array<{ name: string }> }>,
  res: Response
) => {
  const { amenityList } = req.body

  const createdAmenities = await createAmenitiesService(amenityList)

  const apiRes = new ApiRes(res)

  return apiRes.sendSuccessRes(
    { createdAmenities },
    "Amenities created successfully"
  )
}
