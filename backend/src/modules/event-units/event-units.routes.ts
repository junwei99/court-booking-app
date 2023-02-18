import { ROUTES } from "@/constants/routes.constants"
import { Router } from "express"
import { createEventUnitsCtrl } from "@/modules/event-units/controllers/create-event-units.controllers"

const router = Router()

const { EVENT_UNITS } = ROUTES

router.post(EVENT_UNITS, createEventUnitsCtrl)

export { router as eventUnitRoutes }
