"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookings = exports.fetchAvailableTimeslots = void 0;
var fetch_available_timeslots_1 = require("@/modules/bookings/controllers/fetch-available-timeslots");
Object.defineProperty(exports, "fetchAvailableTimeslots", { enumerable: true, get: function () { return fetch_available_timeslots_1.fetchAvailableTimeslots; } });
var create_bookings_1 = require("@/modules/bookings/controllers/create-bookings");
Object.defineProperty(exports, "createBookings", { enumerable: true, get: function () { return create_bookings_1.createBookings; } });
//# sourceMappingURL=booking.controllers.js.map