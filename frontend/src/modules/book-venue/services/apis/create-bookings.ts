import type {
  TBooking,
  TCreateBookingParams,
  TGuestDetails,
} from "@/modules/book-venue/types/api/booking-params.types"
import type { IBookingRes } from "@/modules/book-venue/types/api/booking-res.types"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"

export const createBookingsService = async (
  bookingList: Array<TBooking>,
  guestDetails?: TGuestDetails
) => {
  return Requestor.post<IBookingRes, TCreateBookingParams>(EApiKeys.BOOKINGS, {
    bookingList,
    ...guestDetails,
  })
}
