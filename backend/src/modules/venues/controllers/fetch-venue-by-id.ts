import express from "express"
import { getVenueByIdService } from "@/modules/venues/services/venues.services"

export const fetchVenueByIdCtrl = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log("entered fetchVenueById")
    const { venueId } = req.params
    const venue = await getVenueByIdService(parseInt(venueId))

    console.log({ venue })

    if (venue.length > 0) {
      const {
        title,
        address,
        description,
        min_price,
        max_price,
        phone_num,
        website,
        images,
        social_media,
        amenities,
        event_categories,
      } = venue[0]

      const outputVenue = {
        title,
        address,
        description,
        images,
        priceRange: {
          min: min_price,
          max: max_price,
        },
        contactUsInfo: {
          phoneNum: phone_num,
          website: website,
          socialMedia: social_media,
        },
        amenities,
        eventCategories: event_categories,
      }

      res.json(outputVenue)
    } else {
      console.log("no venues found")
    }
  } catch (error) {
    console.log({ error })
  }
}
