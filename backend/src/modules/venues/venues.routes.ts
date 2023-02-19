import { Router } from "express"
import {
  createAmenityCtrl,
  createVenueCrl,
  fetchVenueByIdCtrl,
  fetchVenuesCtrl,
} from "@/modules/venues/controllers/venues.controllers"
import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"

const venueRouter = Router()

const { VENUE_LIST, VENUE, VENUE_BY_VENUEID, AMENITY } = ROUTES

const routeList: TCtrlRouteList = [
  [VENUE_LIST, "get", fetchVenuesCtrl],
  [VENUE_BY_VENUEID, "get", fetchVenueByIdCtrl],
  [VENUE, "post", createVenueCrl],
  [AMENITY, "post", createAmenityCtrl],
]

mapRoutesInController(routeList, venueRouter)

export { venueRouter }
