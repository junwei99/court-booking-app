import { Requestor } from "@/modules/common/services/requestor/Requestor"
import type { IVenueListRes } from "@/modules/home/types/apis/home.types"
import { EApiKeys } from "@/others/constants/api-keys.constants"

export const fetchVenueList = async () => {
  const venueRes = await Requestor.get<IVenueListRes>(EApiKeys.VENUES)

  if (
    !venueRes?.status ||
    venueRes?.status === "error" ||
    !venueRes?.venueList?.length
  ) {
    throw new Error(venueRes.message)
  }

  return venueRes.venueList
}
