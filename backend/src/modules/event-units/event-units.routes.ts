import { Router } from "express"
import { ROUTES } from "@/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import { createEventUnitsCtrl } from "./controllers/create-event-units.controllers"

const eventUnitRouter = Router()

const { EVENT_UNITS } = ROUTES

const routeList: TCtrlRouteList = [[EVENT_UNITS, "post", createEventUnitsCtrl]]

mapRoutesInController(routeList, eventUnitRouter)

export { eventUnitRouter }
