import express from "express"
import { getVenueByIdService } from "@/modules/venues/services/venues.services"

export const fetchVenueByIdCtrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { venueId } = req.params

  const venue = await getVenueByIdService(parseInt(venueId))

  res.json(venue)
}
