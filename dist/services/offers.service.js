"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _httpException = require("../exceptions/HttpException");
const _offersModel = _interopRequireDefault(require("../models/offers.model"));
const _util = require("../utils/util");
const _constants = require("../utils/constants");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let OfferService = class OfferService {
    async findAllOffer(quer) {
        const { title , offerType , daysOfTheWeek  } = quer;
        const query = {};
        if (title) {
            query.title = {
                $regex: title,
                $options: 'i'
            };
        }
        if (daysOfTheWeek) {
            query.daysOfTheWeek = {
                $regex: daysOfTheWeek,
                $options: 'i'
            };
        }
        if (offerType) {
            query.offerType = {
                $regex: offerType,
                $options: 'i'
            };
        }
        const offers = await this.offers.find(query);
        return offers;
    }
    async findOfferById(offerId) {
        if ((0, _util.isEmpty)(offerId)) throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, 'OfferId is empty');
        const findOffer = await this.offers.findOne({
            _id: offerId
        });
        if (!findOffer) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, "Offer doesn't exist");
        return findOffer;
    }
    async createOffer(offerData) {
        if ((0, _util.isEmpty)(offerData)) throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, 'offerData is empty');
        const findOffer = await this.offers.findOne({
            title: offerData.title
        });
        if (findOffer) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, `This title ${offerData.title} already exists`);
        const createOfferData = await this.offers.create(offerData);
        return createOfferData;
    }
    async updateOffer(offerId, offerData) {
        if ((0, _util.isEmpty)(offerData)) throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, 'offerData is empty');
        const { title  } = offerData;
        if (title) {
            const findOffer = await this.offers.findOne({
                title
            });
            if (findOffer && findOffer._id != offerId) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, `This title ${offerData.title} already exists`);
        }
        return await this.patchOffer(offerId, offerData);
    }
    async patchOffer(_id, offerData) {
        if ((0, _util.isEmpty)(offerData)) throw new _httpException.HttpException(_constants.STATUS_CODES.BAD_REQUEST, 'offerData is empty');
        await this.offers.updateOne({
            _id
        }, offerData);
        const patchedOffer = await this.offers.findById(_id);
        return patchedOffer;
    }
    async deleteOffer(offerId) {
        const deleteOfferById = await this.offers.findByIdAndDelete(offerId);
        if (!deleteOfferById) throw new _httpException.HttpException(_constants.STATUS_CODES.CONFLICT, "Offer doesn't exist");
        return deleteOfferById;
    }
    constructor(){
        this.offers = _offersModel.default;
    }
};
const _default = OfferService;

//# sourceMappingURL=offers.service.js.map