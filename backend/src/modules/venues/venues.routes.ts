import { Router } from "express"
import { fetchVenuesCtrl } from "@/modules/venues/controllers/fetch-venues"
import { createVenueCrl } from "@/modules/venues/controllers/create-venue"
import { createAmenityCtrl } from "@/modules/venues/controllers/create-amenities"
import { fetchVenueByIdCtrl } from "@/modules/venues/controllers/fetch-venue-by-id"
import { ROUTES } from "@/constants/routes.constants"

const router = Router()

const { VENUE_LIST, VENUE, AMENITY } = ROUTES

router.get(VENUE_LIST, fetchVenuesCtrl)
router.get(VENUE + ":venueId", fetchVenueByIdCtrl)
router.post(VENUE, createVenueCrl)
router.post(AMENITY, createAmenityCtrl)

export { router as venueRoutes }
