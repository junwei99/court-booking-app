"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.venueRoutes = void 0;
const express_1 = __importDefault(require("express"));
const venues_controller_1 = require("@/modules/venues/venues.controller");
const router = express_1.default.Router();
exports.venueRoutes = router;
router.post("/api/venue", venues_controller_1.createVenue);
router.post("/api/venuetest", (req, res) => {
    console.log("request", req.body);
});
router.get("/api/venue/:venueId", venues_controller_1.fetchVenueById);
router.get("/api/venues", venues_controller_1.fetchVenues);
//# sourceMappingURL=venues.routes.js.map