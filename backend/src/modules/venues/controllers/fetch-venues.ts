import express from "express"
import { getVenueListService } from "@/modules/venues/services/venues.services"

export const fetchVenuesCtrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const venueList = await getVenueListService()

  res.json(venueList)
}
