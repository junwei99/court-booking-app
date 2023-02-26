import { Router } from "express"
import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import {
  createBookings,
  fetchAvailableTimeslots,
} from "@/modules/bookings/controllers/bookings.controllers"

const bookingsRouter = Router()

const { GET_AVAILABLE_TIMESLOTS, BOOKINGS } = ROUTES

const routeList: TCtrlRouteList = [
  [GET_AVAILABLE_TIMESLOTS, "get", fetchAvailableTimeslots],
  [BOOKINGS, "post", createBookings],
]

mapRoutesInController(routeList, bookingsRouter)

export { bookingsRouter }
