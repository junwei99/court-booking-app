import express from "express"
import { createVenueService } from "@/modules/venues/services/venues.services"
import { TReqBody } from "@/modules/common/types/common.types"
import { IInsertVenueParams } from "../queries/create-venues/create-venues.queries"

export const createVenueCrl = async (
  req: TReqBody<IInsertVenueParams>,
  res: express.Response,
  next: express.NextFunction
) => {
  const { socialMedia } = req.body

  const jsonSocialMedia = JSON.stringify(
    socialMedia as Array<{ type: string; link: string }>
  )

  const createVenueServiceBody = { ...req.body, socialMedia: jsonSocialMedia }

  const createdVenue = createVenueService(createVenueServiceBody)

  return res.json(createdVenue)
}
