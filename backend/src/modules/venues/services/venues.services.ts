import { client } from "@/index"
import { queryVenueById } from "@/modules/venues/queries/query-venue-by-id/get-venue-by-id.queries"
import { queryVenues } from "@/modules/venues/queries/query-venues/get-venues.queries"
import {
  IInsertVenueParams,
  insertVenue,
} from "@/modules/venues/queries/create-venues/create-venues.queries"
import { insertAmenitiesSQL } from "../queries/create-amenities/create-amenities.queries"

export const getVenueByIdService = async (venueId: number) => {
  return await queryVenueById.run({ venueId }, client)
}

export const getVenueListService = async () => {
  const venueList = await queryVenues.run(undefined, client)

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

export const createVenueService = async (venueParam: IInsertVenueParams) => {
  console.log({ venueParam })

  const createdVenue = await insertVenue.run(venueParam, client)

  return createdVenue
}

export const createAmenitiesService = async (
  amenityList: Array<{ name: string }>
) => {
  return await insertAmenitiesSQL.run({ amenityList }, client)
}
