import { NextFunction, Request, Response } from "express"
import { getVenueByIdService } from "@/modules/venues/services/venues.services"

export const fetchVenueByIdCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { venueId } = req.params

  const venue = await getVenueByIdService(parseInt(venueId))

  res.json(venue)
}
