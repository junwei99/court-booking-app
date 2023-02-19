import { client } from "@/index"
import { queryVenueById } from "@/modules/venues/queries/query-venue-by-id/get-venue-by-id.queries"
import { queryVenues } from "@/modules/venues/queries/query-venues/get-venues.queries"
import {
  IInsertVenueParams,
  insertVenue,
} from "@/modules/venues/queries/create-venues/create-venues.queries"
import { insertAmenityList } from "@/modules/venues/queries/create-amenities/create-amenity-list.queries"
import { HandledError } from "@/modules/common/utils/HandledError.utils"

export const getVenueByIdService = async (venueId: number) => {
  const [venue] = await queryVenueById.run({ venueId }, client)

  if (venue?.id) {
    return {
      title: venue.title,
      address: venue.address,
      description: venue.description,
      images: venue.images,
      priceRange: {
        min: venue.min_price,
        max: venue.max_price,
      },
      contactUsInfo: {
        phoneNum: venue.phone_num,
        website: venue.website,
        socialMedia: venue.social_media,
      },
      amenities: venue.amenities,
      eventCategories: venue.event_categories,
    }
  }

  throw new HandledError("No Venue Found")
}

export const getVenueListService = async () => {
  const venueList = await queryVenues.run(undefined, client)

  if (venueList?.length >= 0) {
    return venueList.map((venue) => ({
      id: venue.id,
      title: venue.title,
      eventCategories: { name: venue.event_categories },
      priceRange: {
        min: venue.min_price,
        max: venue.max_price,
      },
      location: venue.location_name,
      image: venue.images[0],
    }))
  }

  throw new HandledError("Failed to fetch venue list")
}

export const createVenueService = async (venueParam: IInsertVenueParams) => {
  const createdVenue = await insertVenue.run(venueParam, client)

  if (createdVenue.length > 0 && createdVenue[0].id) {
    return createdVenue
  }

  throw new HandledError("Venue not created")
}

export const createAmenitiesService = async (
  amenityList: Array<{ name: string }>
) => {
  return await insertAmenityList.run({ amenityList }, client)
}
