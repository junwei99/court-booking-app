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
exports.createAmenity = void 0;
const Amenity_1 = require("@/entities/Amenity");
const createAmenity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amenityList } = req.body;
    amenityList.forEach((amenity) => __awaiter(void 0, void 0, void 0, function* () {
        const amenityToCreate = Amenity_1.Amenity.create({
            name: amenity.name,
        });
        yield amenityToCreate.save();
    }));
    return res.json({ msg: "amenities successfully created" });
});
exports.createAmenity = createAmenity;
//# sourceMappingURL=create-amenities.js.map