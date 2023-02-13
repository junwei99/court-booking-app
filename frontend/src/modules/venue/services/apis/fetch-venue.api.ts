import { EApiKeys } from "@/others/constants/api-keys.constants"
import { Requestor } from "@/modules/common/services/requestor/Requestor"

import type { IVenueRes } from "@/modules/venue/types/apis/venue-res"

export const fetchVenue = async (venueId: number) => {
  const venueRes = Requestor.get<IVenueRes>(EApiKeys.VENUE, undefined, venueId)

  return venueRes
}
