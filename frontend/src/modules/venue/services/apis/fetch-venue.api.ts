import { Requestor } from "@/modules/common/services/requestor/Requestor"
import { EApiKeys } from "@/others/constants/api-keys.constants"

import type { IVenueRes } from "@/modules/venue/types/apis/venue-res"

export const fetchVenue = async (venueId: number) => {
  const venueRes = await Requestor.get<IVenueRes>(
    EApiKeys.VENUE,
    undefined,
    venueId
  )

  if (
    ![
      venueRes?.status,
      venueRes?.status !== "error",
      venueRes?.venue,
      venueRes?.venue?.id,
      venueRes?.venue?.title,
    ].every(Boolean)
  ) {
    throw new Error(venueRes.message)
  }

  return venueRes.venue
}
