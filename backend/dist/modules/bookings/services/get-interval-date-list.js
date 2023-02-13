"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntervalDateList = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const intervalMin = 30;
const getIntervalDateList = (startDateTime, intervalMinutes = intervalMin, endDateTime) => {
    const startDt = (0, dayjs_1.default)(startDateTime);
    const endDt = endDateTime
        ? (0, dayjs_1.default)(endDateTime)
        : (0, dayjs_1.default)(startDateTime).endOf("day");
    let dtInLoop = startDt;
    const datetimeIntervalList = [];
    while (dtInLoop.isBefore(endDt)) {
        const datetimeToBeAdded = dtInLoop.add(intervalMinutes, "minute");
        datetimeIntervalList.push(datetimeToBeAdded.toDate());
        dtInLoop = datetimeToBeAdded;
    }
    return datetimeIntervalList;
};
exports.getIntervalDateList = getIntervalDateList;
//# sourceMappingURL=get-interval-date-list.js.map