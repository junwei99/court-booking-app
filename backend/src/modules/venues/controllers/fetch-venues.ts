import { NextFunction, Request, Response } from "express"
import { getVenueListService } from "@/modules/venues/services/venues.services"

export const fetchVenuesCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const venueList = await getVenueListService()

  res.json(venueList)
}
