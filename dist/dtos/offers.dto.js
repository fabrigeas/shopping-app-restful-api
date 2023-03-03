"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CreateOfferDto: ()=>CreateOfferDto,
    UpdateOfferDto: ()=>UpdateOfferDto,
    PatchOfferDto: ()=>PatchOfferDto
});
const _classValidator = require("class-validator");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let CreateOfferDto = class CreateOfferDto {
};
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "title", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "price", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "offerType", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateOfferDto.prototype, "date", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "description", void 0);
__decorate([
    (0, _classValidator.IsArray)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "images", void 0);
__decorate([
    (0, _classValidator.IsArray)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "daysOfTheWeek", void 0);
let UpdateOfferDto = class UpdateOfferDto extends CreateOfferDto {
};
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], UpdateOfferDto.prototype, "id", void 0);
let PatchOfferDto = class PatchOfferDto {
};
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], PatchOfferDto.prototype, "title", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], PatchOfferDto.prototype, "price", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], PatchOfferDto.prototype, "offerType", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PatchOfferDto.prototype, "date", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], PatchOfferDto.prototype, "description", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsArray)(),
    __metadata("design:type", Array)
], PatchOfferDto.prototype, "images", void 0);
__decorate([
    (0, _classValidator.IsOptional)(),
    (0, _classValidator.IsArray)(),
    __metadata("design:type", Array)
], PatchOfferDto.prototype, "daysOfTheWeek", void 0);

//# sourceMappingURL=offers.dto.js.map