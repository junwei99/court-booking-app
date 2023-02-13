"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookings = void 0;
const index_1 = require("@/index");
const entities_1 = require("@/entities");
const ApiError_1 = require("@/utils/ApiError");
const createBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingList } = req.body;
    const bookingListToCreate = [];
    for (const booking of bookingList) {
        const eventUnit = yield entities_1.EventUnit.findOneBy({
            id: booking.eventUnitId,
        });
        if (eventUnit) {
            bookingListToCreate.push({
                booking_start_date: new Date(booking.bookingStartDate),
                booking_end_date: new Date(booking.bookingEndDate),
                event_unit: eventUnit,
            });
        }
        else {
            next(ApiError_1.ApiError.badRequest("event unit doesn't exist"));
        }
    }
    const bookingRepo = index_1.dataSource.getRepository(entities_1.Booking);
    yield bookingRepo.insert(bookingListToCreate);
    res.json({ msg: "booking succesfully created" });
});
exports.createBookings = createBookings;
//# sourceMappingURL=create-bookings.js.map