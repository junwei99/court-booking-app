import express from "express"
import { fetchVenuesCtrl } from "@/modules/venues/controllers/fetch-venues"
import { createVenueCrl } from "@/modules/venues/controllers/create-venue"
import { createAmenityCtrl } from "@/modules/venues/controllers/create-amenities"
import { fetchVenueByIdCtrl } from "@/modules/venues/controllers/fetch-venue-by-id"

const router = express.Router()

router.get("/api/venues", fetchVenuesCtrl)
router.get("/api/venue/:venueId", fetchVenueByIdCtrl)
router.post("/api/venue", createVenueCrl)
router.post("/api/amenity", createAmenityCtrl)

export { router as venueRoutes }
