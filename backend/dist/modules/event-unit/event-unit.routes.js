"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventUnitsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const create_event_units_1 = require("@/modules/event-unit/controllers/create-event-units");
const router = express_1.default.Router();
exports.eventUnitsRoutes = router;
router.post("/api/event-units", create_event_units_1.createEventUnits);
//# sourceMappingURL=event-unit.routes.js.map