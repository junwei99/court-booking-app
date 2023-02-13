import { EApiKeys } from "@/others/constants/api-keys.constants"
import { Requestor } from "@/modules/common/services/requestor/Requestor"
interface IVenueRes {
  id: number
  title: string
  eventCategories: Array<{ name: string }>
  priceRange: { min: number; max: number }
  location: string
  image: string
}

export const fetchVenueList = async () => {
  const venueRes = Requestor.get<IVenueRes>(EApiKeys.VENUES)

  return venueRes
}
