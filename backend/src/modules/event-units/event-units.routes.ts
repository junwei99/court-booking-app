import { Router } from "express"
import { ROUTES } from "@/modules/common/constants/routes.constants"
import { TCtrlRouteList } from "@/modules/common/types/common.types"
import { mapRoutesInController } from "@/modules/common/utils/controller.utils"
import {
  createEventUnitsCtrl,
  createEventCategoriesCtrl,
} from "@/modules/event-units/controllers/event-units.controllers"

const eventUnitRouter = Router()

const { EVENT_UNITS, EVENT_CATEGORIES, EVENT_CATEGORIES_OF_VENUE } = ROUTES

const routeList: TCtrlRouteList = [
  [EVENT_UNITS, "post", createEventUnitsCtrl],
  [EVENT_CATEGORIES, "post", createEventCategoriesCtrl],
]

mapRoutesInController(routeList, eventUnitRouter)

export { eventUnitRouter }
