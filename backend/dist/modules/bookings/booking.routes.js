"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controllers_1 = require("@/modules/bookings/booking.controllers");
const router = express_1.default.Router();
exports.bookingRoutes = router;
router.get("/api/get-available-timeslots", booking_controllers_1.fetchAvailableTimeslots);
router.post("/api/bookings", booking_controllers_1.createBookings);
//# sourceMappingURL=booking.routes.js.map