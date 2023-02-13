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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAvailableTimeslots = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const index_1 = require("@/index");
const entities_1 = require("@/entities");
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const get_interval_date_list_1 = require("@/modules/bookings/services/get-interval-date-list");
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isBetween_1.default);
const fetchAvailableTimeslots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { venueId, eventCategoryId, startDatetime } = req.body;
    const startDatetimeObj = new Date(startDatetime);
    const eventUnits = yield index_1.dataSource
        .getRepository(entities_1.EventUnit)
        .createQueryBuilder("event_units")
        .leftJoinAndSelect("event_units.bookings", "booking")
        .where("event_units.venue_id = :venueId AND event_units.event_category_id = :eventCategoryId", { venueId: parseInt(venueId), eventCategoryId: parseInt(eventCategoryId) })
        .getMany();
    const intervalDateList = (0, get_interval_date_list_1.getIntervalDateList)((0, dayjs_1.default)(startDatetimeObj).startOf("day").toDate());
    let outputIntervalDateList = intervalDateList.map((datetime) => (0, dayjs_1.default)(datetime).format("HH:mm"));
    const bookingsFromDB = yield index_1.dataSource
        .getRepository(entities_1.Booking)
        .createQueryBuilder("booking")
        .leftJoinAndSelect("booking.event_unit", "event_units")
        .where("event_units.venue_id = :venueId AND event_units.event_category_id = :eventCategoryId", {
        venueId: parseInt(venueId),
        eventCategoryId: parseInt(eventCategoryId),
    })
        .andWhere(":startDatetime BETWEEN booking.booking_start_date AND booking.booking_end_date", {
        startDatetime: startDatetime,
    })
        .getMany();
    const isAllEventUnitsFullyBooked = eventUnits.every((eventUnit) => eventUnit.bookings.some((booking) => (0, dayjs_1.default)(startDatetime).isBetween((0, dayjs_1.default)(booking.booking_start_date), (0, dayjs_1.default)(booking.booking_end_date), "minute")));
    let outputTimeList = [];
    let twelveHourDateList = [];
    let outputList = [];
    if (isAllEventUnitsFullyBooked) {
        twelveHourDateList = intervalDateList
            .filter((datetime, index) => {
            return !bookingsFromDB.some((booking) => {
                const dayjsBookingStartDate = (0, dayjs_1.default)(booking.booking_start_date);
                const dayjsBookingEndDate = (0, dayjs_1.default)(booking.booking_end_date);
                const dayjsIntervalDatetime = (0, dayjs_1.default)(datetime);
                return (dayjsIntervalDatetime.isSame(dayjsBookingStartDate) ||
                    dayjsIntervalDatetime.isBetween(dayjsBookingStartDate, dayjsBookingEndDate, "minute"));
            });
        })
            .map((datetime) => (0, dayjs_1.default)(datetime).format("h:mm A"));
        const twelveHourTimeWithoutAMPMList = new Set([...twelveHourDateList].map((d) => d.split(" ")[0]));
        const twelveHourOutputTimeMap = new Map([...twelveHourTimeWithoutAMPMList].map((time) => [
            time,
            { time: time, amOrPm: { am: false, pm: false } },
        ]));
        twelveHourDateList.forEach((time) => {
            const splitTime = time.split(" ");
            const currentTimeObj = twelveHourOutputTimeMap.get(splitTime[0]);
            if (currentTimeObj) {
                const amPmKey = splitTime[1] === "AM" ? "am" : "pm";
                currentTimeObj.amOrPm[amPmKey] = true;
                twelveHourOutputTimeMap.set(time[0], currentTimeObj);
            }
        });
        outputList = [...twelveHourOutputTimeMap];
    }
    res.json({
        newLength: outputIntervalDateList.length,
        oldLength: intervalDateList.map((date) => (0, dayjs_1.default)(date).format("DD/MM/YY HH:mm:ss")).length,
        new: outputIntervalDateList,
        old: intervalDateList.map((date) => (0, dayjs_1.default)(date).format("DD/MM/YYYY HH:mm:ss")),
        twelveHourDateList: twelveHourDateList,
        outputTimeList: outputTimeList,
        twelveHourTimeMap: outputList,
    });
});
exports.fetchAvailableTimeslots = fetchAvailableTimeslots;
//# sourceMappingURL=fetch-available-timeslots.js.map