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
exports.createEventUnits = void 0;
const entities_1 = require("@/entities");
const ApiError_1 = require("@/utils/ApiError");
const index_1 = require("@/index");
const createEventUnits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventUnitList } = req.body;
    const eventUnitListToCreate = [];
    for (const eventUnit of eventUnitList) {
        const { name, price, venueId, eventCategoryId } = eventUnit;
        const venuePromise = yield entities_1.Venue.findOneBy({
            id: venueId,
        });
        const eventCategoryPromise = yield entities_1.EventCategory.findOneBy({
            id: eventCategoryId,
        });
        const [venue, eventCategory] = yield Promise.all([
            venuePromise,
            eventCategoryPromise,
        ]);
        if (venue && eventCategory) {
            eventUnitListToCreate.push({
                name,
                price,
                venue: venue,
                event_category: eventCategory,
            });
            console.log({ name, price, venue: venue, event_category: eventCategory });
        }
        else {
            next(ApiError_1.ApiError.badRequest("venue or event category does not exists"));
        }
    }
    console.log({ eventUnitListToCreate });
    if (eventUnitListToCreate && eventUnitListToCreate.length > 0) {
        const eventUnitRepo = index_1.dataSource.getRepository(entities_1.EventUnit);
        yield eventUnitRepo.insert(eventUnitListToCreate);
        res.json({ msg: "event units succesfully created" });
    }
    else {
        next(ApiError_1.ApiError.badRequest("event unit failed to be created"));
    }
});
exports.createEventUnits = createEventUnits;
//# sourceMappingURL=create-event-units.js.map