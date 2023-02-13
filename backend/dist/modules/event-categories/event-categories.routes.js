"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_categories_controllers_1 = require("@/modules/event-categories/event-categories.controllers");
const router = express_1.default.Router();
exports.eventCategoryRoutes = router;
router.post("/api/event-categories", event_categories_controllers_1.createEventCategories);
router.get("/api/event-categories-of-venue/:venueId", event_categories_controllers_1.getEventCategoriesOfVenue);
//# sourceMappingURL=event-categories.routes.js.map