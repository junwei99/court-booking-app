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
exports.fetchVenues = void 0;
const src_1 = require("src");
const entities_1 = require("@/entities");
const fetchVenues = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const perPage = 10;
    const page = 1;
    const skip = perPage * page - perPage;
    const venueList = yield src_1.dataSource
        .getRepository(entities_1.Venue)
        .createQueryBuilder("venue")
        .leftJoinAndSelect("venue.location", "location")
        .leftJoinAndSelect("venue.event_categories", "event_categories")
        .select([
        "venue.id",
        "venue.title",
        "venue.min_price",
        "venue.max_price",
        "venue.images",
        "location.name",
        "event_categories.name",
    ])
        .limit(10)
        .getMany();
    console.log({ venueList });
    const outputVenueList = venueList.map((venue) => ({
        id: venue.id,
        title: venue.title,
        eventCategories: venue.event_categories,
        priceRange: {
            min: venue.min_price,
            max: venue.max_price,
        },
        location: venue.location.name,
        image: venue.images[0],
    }));
    res.json(outputVenueList);
});
exports.fetchVenues = fetchVenues;
//# sourceMappingURL=fetch-venues.js.map