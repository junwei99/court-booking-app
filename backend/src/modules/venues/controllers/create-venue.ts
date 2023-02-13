import express from "express"
import { createVenueService } from "@/modules/venues/services/venues.services"
import { TypedRequestBody } from "@/modules/common/types/common.types"
import { IInsertVenueParams } from "../queries/create-venues/create-venues.queries"

export const createVenueCrl = async (
  req: TypedRequestBody<IInsertVenueParams>,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log({ reqBody: req.body })
    console.log({ type: typeof req.body })

    const {
      title,
      address,
      description,
      minPrice,
      maxPrice,
      phoneNum,
      website,
      images,
      socialMedia,
      amenityIdList,
      eventCategoryIdList,
    } = req.body

    const jsonSocialMedia = JSON.stringify(
      socialMedia as Array<{ type: string; link: string }>
    )

    const createdVenue = await createVenueService({
      title,
      address,
      description,
      minPrice,
      maxPrice,
      phoneNum,
      website,
      images,
      socialMedia: jsonSocialMedia,
      amenityIdList,
      eventCategoryIdList,
    })
    return res.json(createdVenue)
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error })
  }
}
