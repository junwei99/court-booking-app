import { client } from "@/index"
import { queryBookings } from "@/modules/bookings/queries/query-bookings/query-bookings.queries"

export const queryBookingsService = async (
  venueId: number,
  eventCategoryId: number
) => {
  const bookings = await queryBookings.run({ venueId, eventCategoryId }, client)
  return bookings
}
