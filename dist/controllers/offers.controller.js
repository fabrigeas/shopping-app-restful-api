"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _offersService = _interopRequireDefault(require("../services/offers.service"));
const _constants = require("../utils/constants");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let OffersController = class OffersController {
    constructor(){
        this.offerService = new _offersService.default();
        this.getOffers = async (req, res, next)=>{
            try {
                const offers = await this.offerService.findAllOffer(req.query);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    offers,
                    message: _constants.STATUS_MESSAGE.FIND_ALL
                });
            } catch (error) {
                next(error);
            }
        };
        this.getOfferById = async (req, res, next)=>{
            try {
                const offer = await this.offerService.findOfferById(req.params.id);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    offer,
                    message: _constants.STATUS_MESSAGE.FIND_ONE
                });
            } catch (error) {
                next(error);
            }
        };
        this.createOffer = async (req, res, next)=>{
            try {
                const offerData = req.body;
                const offer = await this.offerService.createOffer(offerData);
                res.status(_constants.STATUS_CODES.CREATED).json({
                    offer,
                    message: _constants.STATUS_MESSAGE.CREATED
                });
            } catch (error) {
                next(error);
            }
        };
        this.updateOffer = async (req, res, next)=>{
            try {
                const offerId = req.params.id;
                const offerData = req.body;
                const offer = await this.offerService.updateOffer(offerId, offerData);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    offer,
                    message: _constants.STATUS_MESSAGE.UPDATED
                });
            } catch (error) {
                next(error);
            }
        };
        this.patchOffer = async (req, res, next)=>{
            try {
                const offerId = req.params.id;
                const offerData = req.body;
                const offer = await this.offerService.patchOffer(offerId, offerData);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    offer,
                    message: _constants.STATUS_MESSAGE.UPDATED
                });
            } catch (error) {
                next(error);
            }
        };
        this.deleteOffer = async (req, res, next)=>{
            try {
                const offerId = req.params.id;
                const offer = await this.offerService.deleteOffer(offerId);
                res.status(_constants.STATUS_CODES.SUCCESS).json({
                    offer,
                    message: _constants.STATUS_MESSAGE.DELETED
                });
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = OffersController;

//# sourceMappingURL=offers.controller.js.map