"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("@/entities");
let Venue = class Venue extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Venue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Venue.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Venue.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Venue.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Venue.prototype, "min_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Venue.prototype, "max_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Venue.prototype, "phone_num", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Venue.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, default: "{}" }),
    __metadata("design:type", Array)
], Venue.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        array: false,
        default: () => "'[]'",
        nullable: true,
    }),
    __metadata("design:type", Array)
], Venue.prototype, "social_media", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.Amenity),
    (0, typeorm_1.JoinTable)({
        name: "venue_amenities",
        joinColumn: {
            name: "venue_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "amenity_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Venue.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.EventCategory),
    (0, typeorm_1.JoinTable)({
        name: "venue_event_categories",
        joinColumn: {
            name: "venue_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "event_category_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Venue.prototype, "event_categories", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Location, (location) => location.venue, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "location_id",
    }),
    __metadata("design:type", entities_1.Location)
], Venue.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.EventUnit, (eventUnit) => eventUnit.venue, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "event_unit_id",
    }),
    __metadata("design:type", Array)
], Venue.prototype, "eventUnits", void 0);
Venue = __decorate([
    (0, typeorm_1.Entity)("venue")
], Venue);
exports.Venue = Venue;
//# sourceMappingURL=venue.js.map