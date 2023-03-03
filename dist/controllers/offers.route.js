"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _offersController = _interopRequireDefault(require("./offers.controller"));
const _offersDto = require("../dtos/offers.dto");
const _validationMiddleware = _interopRequireDefault(require("../middlewares/validation.middleware"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let OffersRoute = class OffersRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.offersController.getOffers);
        this.router.get(`${this.path}/:id`, this.offersController.getOfferById);
        this.router.post(`${this.path}`, (0, _validationMiddleware.default)(_offersDto.CreateOfferDto, 'body'), this.offersController.createOffer);
        this.router.put(`${this.path}/:id`, (0, _validationMiddleware.default)(_offersDto.UpdateOfferDto, 'body', false), this.offersController.updateOffer);
        this.router.patch(`${this.path}/:id`, (0, _validationMiddleware.default)(_offersDto.PatchOfferDto, 'body', false), this.offersController.patchOffer);
        this.router.delete(`${this.path}/:id`, this.offersController.deleteOffer);
    }
    constructor(){
        this.path = '/api/offers';
        this.router = (0, _express.Router)();
        this.offersController = new _offersController.default();
        this.initializeRoutes();
    }
};
const _default = OffersRoute;

//# sourceMappingURL=offers.route.js.map