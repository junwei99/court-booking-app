import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import {
  createAmenityCtrl,
  createVenueCrl,
  fetchVenueByIdCtrl,
  fetchVenuesCtrl,
  test,
} from "@/modules/venues/controllers/venues.controllers"
import { Router } from "express"

const venueRouter = Router()

const { VENUE_LIST, VENUE, VENUE_BY_VENUEID, AMENITY, TEST } = ROUTES

const routeList: TCtrlRouteList = [
  [VENUE_LIST, "get", fetchVenuesCtrl],
  [VENUE_BY_VENUEID, "get", fetchVenueByIdCtrl],
  [VENUE, "post", createVenueCrl],
  [AMENITY, "post", createAmenityCtrl],
  [TEST, "post", test],
]

mapRoutesInController(routeList, venueRouter)

export { venueRouter }
