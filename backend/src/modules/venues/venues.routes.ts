import express from "express"
import { fetchVenueByIdCtrl } from "@/modules/venues/venues.controllers"
import { fetchVenuesCtrl } from "@/modules/venues/controllers/fetch-venues"
import { createVenueCrl } from "@/modules/venues/controllers/create-venue"

const router = express.Router()

router.get("/api/venues", fetchVenuesCtrl)
router.get("/api/venue/:venueId", fetchVenueByIdCtrl)
router.post("/api/venue", createVenueCrl)

export { router as venueRoutes }
