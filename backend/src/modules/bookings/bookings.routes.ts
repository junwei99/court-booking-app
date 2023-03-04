import {
  createBookings,
  fetchAvailableEventUnitsToBook,
  fetchAvailableTimeslots,
} from "@/modules/bookings/controllers/bookings.controllers"
import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import { Router } from "express"

const bookingsRouter = Router()

const { GET_AVAILABLE_TIMESLOTS, BOOKINGS, AVAILABLE_EVENT_UNITS_TO_BOOK } =
  ROUTES

const routeList: TCtrlRouteList = [
  [GET_AVAILABLE_TIMESLOTS, "get", fetchAvailableTimeslots],
  [BOOKINGS, "post", createBookings],
  [AVAILABLE_EVENT_UNITS_TO_BOOK, "post", fetchAvailableEventUnitsToBook],
]

mapRoutesInController(routeList, bookingsRouter)

export { bookingsRouter }
