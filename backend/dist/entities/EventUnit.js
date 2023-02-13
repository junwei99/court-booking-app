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
exports.EventUnit = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("@/entities");
let EventUnit = class EventUnit extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventUnit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventUnit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventUnit.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Venue, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "venue_id",
    }),
    __metadata("design:type", entities_1.Venue)
], EventUnit.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.EventCategory, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "event_category_id",
    }),
    __metadata("design:type", entities_1.EventCategory)
], EventUnit.prototype, "event_category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Booking, (booking) => booking.event_unit, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "booking_id",
    }),
    __metadata("design:type", Array)
], EventUnit.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EventUnit.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EventUnit.prototype, "updated_at", void 0);
EventUnit = __decorate([
    (0, typeorm_1.Entity)("event_units")
], EventUnit);
exports.EventUnit = EventUnit;
//# sourceMappingURL=EventUnit.js.map