import type { TBookingRes } from "@/modules/book-venue/types/api/booking-res.types"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"
import { z } from "zod"

const bookingSchema = z.object({
  booking: z.object({
    bookingId: z.string(),
    venueId: z.number(),
    venueName: z.string(),
    totalAmount: z.number(),
    guestEmail: z.string().optional(),
    guestFirstName: z.string().optional(),
    guestLastName: z.string().optional(),
  }),
  status: z.string(),
  message: z.string().optional(),
})

export const fetchBooking = async (bookingId: string) => {
  const params = {
    bookingId,
  }

  const bookingInfo = await Requestor.get<
    { booking: TBookingRes },
    { bookingId: string }
  >(EApiKeys.BOOKING, params)

  const bookingResult = bookingSchema.safeParse(bookingInfo)

  if (!bookingResult.success) {
    throw new Error("Validation failed!")
  }

  return bookingResult.data
}
