import { createBookingsService } from "@/modules/book-venue/services/apis/create-bookings"
import type { TCheckoutFormData } from "@/modules/book-venue/types/api/booking-params.types"
import type { TCartItem } from "@/modules/book-venue/types/components/cart.types"
import { z } from "zod"

export const guestFormZodSchema = z.object({
  guestFirstName: z.string().min(1, { message: "First name is required" }),
  guestLastName: z.string().min(1, { message: "Last name is required" }),
  guestEmail: z.string().email({ message: "Invalid email address" }),
})

export const handleSubmitBooking = async (
  eventUnitsList: Array<TCartItem>,
  checkoutForm: TCheckoutFormData
) => {
  const bookingList = eventUnitsList.map((booking) => ({
    bookingStartDate: booking.bookingDatetime,
    eventUnitId: booking.eventUnit.eventUnitId,
    duration: booking.duration,
  }))

  const createBookingRes = await createBookingsService(
    bookingList,
    checkoutForm
  )

  if (
    createBookingRes.status !== "success" ||
    !createBookingRes.createdBookingIds?.length ||
    createBookingRes.createdBookingIds.length === 0
  ) {
    throw new Error("failed to create booking")
  }

  return createBookingRes
}
