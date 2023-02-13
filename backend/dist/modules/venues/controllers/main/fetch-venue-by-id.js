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
exports.fetchVenueById = void 0;
const src_1 = require("src");
const entities_1 = require("@/entities");
const ApiError_1 = require("@/utils/ApiError");
const fetchVenueById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { venueId } = req.params;
        const venue = yield src_1.dataSource.getRepository(entities_1.Venue).find({
            relations: ["amenities", "event_categories"],
            where: { id: parseInt(venueId) },
        });
        if (venue.length > 0) {
            const { title, address, description, min_price, max_price, phone_num, website, images, social_media, amenities, event_categories, } = venue[0];
            const outputVenue = {
                title,
                address,
                description,
                images,
                priceRange: {
                    min: min_price,
                    max: max_price,
                },
                contactUsInfo: {
                    phoneNum: phone_num,
                    website: website,
                    socialMedia: social_media,
                },
                amenities,
                eventCategories: event_categories,
            };
            res.json(outputVenue);
        }
        else {
            next(ApiError_1.ApiError.badRequest("venue does not exists"));
        }
    }
    catch (error) {
        next(ApiError_1.ApiError.internal(error.message));
    }
});
exports.fetchVenueById = fetchVenueById;
//# sourceMappingURL=fetch-venue-by-id.js.map