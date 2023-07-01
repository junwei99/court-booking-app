import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"
import type { TBookingRes } from "../../types/api/booking-res.types"

export const fetchBooking = async (bookingId: string) => {
  const params = {
    bookingId,
  }

  const availableBookingTimeListRes = await Requestor.get<
    { booking: TBookingRes },
    { bookingId: string }
  >(EApiKeys.BOOKING, params)

  return availableBookingTimeListRes
}
