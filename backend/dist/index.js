"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
exports.dataSource = void 0
const typeorm_1 = require("typeorm")
const express_1 = __importDefault(require("express"))
const entities_1 = require("@/entities")
const cors_1 = __importDefault(require("cors"))
const api_error_handler_1 = require("@/middlewares/api-error-handler")
const path_1 = __importDefault(require("path"))
const body_parser_1 = __importDefault(require("body-parser"))
const venues_routes_1 = require("@/modules/venues/venues.routes")
const booking_routes_1 = require("@/modules/bookings/booking.routes")
const admin_routes_1 = require("@/modules/admin/admin.routes")
const event_unit_routes_1 = require("@/modules/event-unit/event-unit.routes")
const event_categories_routes_1 = require("@/modules/event-categories/event-categories.routes")
const app = (0, express_1.default)()
app.use((0, cors_1.default)())
app.set("view engine", "ejs")
app.set("views", path_1.default.join(__dirname, "../src/views"))
app.use(body_parser_1.default.urlencoded({ extended: false }))
app.use(body_parser_1.default.json())
exports.dataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "junwei",
  password: undefined,
  database: "court-booking-app",
  entities: [
    entities_1.Venue,
    entities_1.Amenity,
    entities_1.EventCategory,
    entities_1.Location,
    entities_1.Booking,
    entities_1.EventUnit,
  ],
  synchronize: true,
})
const routesList = [
  venues_routes_1.venueRoutes,
  event_categories_routes_1.eventCategoryRoutes,
  event_unit_routes_1.eventUnitsRoutes,
  booking_routes_1.bookingRoutes,
  admin_routes_1.adminRoutes,
]
const main = (dataSource) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const connection = yield dataSource.initialize()
      console.log("Connected to Postgres!")
      app.use(express_1.default.json())
      routesList.map((route) => app.use(route))
      app.use(api_error_handler_1.apiErrorHandler)
      app.listen(8080, () => {
        console.log("running on port 8080")
      })
    } catch (error) {
      console.error(error)
      throw new Error("Unable to connect to db")
    }
  })
main(exports.dataSource)
//# sourceMappingURL=index.js.map
