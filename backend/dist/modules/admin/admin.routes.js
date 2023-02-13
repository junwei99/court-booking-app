"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const venues_controller_1 = require("@/modules/venues/venues.controller");
const create_amenities_1 = require("@/modules/admin/amenities/controllers/create-amenities");
const router = express_1.default.Router();
exports.adminRoutes = router;
router.post("/api/location", venues_controller_1.createLocations);
router.post("/api/amenity", create_amenities_1.createAmenity);
router.get("/views", (req, res) => {
    res.render("index.ejs");
});
//# sourceMappingURL=admin.routes.js.map