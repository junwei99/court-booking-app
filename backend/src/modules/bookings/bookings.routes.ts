import { Router } from "express"
import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import {
  createBookings,
  fetchAvailableEventUnitsToBook,
  fetchAvailableTimeslots,
} from "@/modules/bookings/controllers/bookings.controllers"

const bookingsRouter = Router()

const { GET_AVAILABLE_TIMESLOTS, BOOKINGS, AVAILABLE_EVENT_UNITS_TO_BOOK } =
  ROUTES

const routeList: TCtrlRouteList = [
  [GET_AVAILABLE_TIMESLOTS, "get", fetchAvailableTimeslots],
  [BOOKINGS, "post", createBookings],
  [AVAILABLE_EVENT_UNITS_TO_BOOK, "get", fetchAvailableEventUnitsToBook],
]

mapRoutesInController(routeList, bookingsRouter)

export { bookingsRouter }
