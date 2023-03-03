"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mongoose = _interopRequireDefault(require("mongoose"));
const _supertest = _interopRequireDefault(require("supertest"));
const _app = _interopRequireDefault(require("../app"));
const _offersRoute = _interopRequireDefault(require("../routes/offers.route"));
const _constants = require("../utils/constants");
const _fake = require("./fake");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
afterAll(async ()=>{
    await new Promise((resolve)=>setTimeout(()=>resolve(), 500));
});
describe('Testing Offers', ()=>{
    const offersRoute = new _offersRoute.default();
    const offers = offersRoute.offersController.offerService.offers;
    describe('[GET] /offers', ()=>{
        test('response findAll Offers', async ()=>{
            offers.find = jest.fn().mockReturnValue((0, _fake.fakeOfferList)(4));
            _mongoose.default.connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).get(`${offersRoute.path}`).expect(_constants.STATUS_CODES.SUCCESS);
        });
        test.each([
            'alpha',
            'beta',
            'charly'
        ])(`response findAll Offers?title=%s`, async (title)=>{
            offers.find = jest.fn().mockReturnValue([
                (0, _fake.fakeOffer)({
                    title
                }),
                (0, _fake.fakeOfferList)(2)
            ]);
            _mongoose.default.connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).get(`${offersRoute.path}`).expect(_constants.STATUS_CODES.SUCCESS);
        });
    });
    describe('[GET] /offers/:id', ()=>{
        test('response findOne Offers', async ()=>{
            const offerId = 'qpwoeiruty';
            const offersRoute = new _offersRoute.default();
            const offers = offersRoute.offersController.offerService.offers;
            offers.findOne = jest.fn().mockReturnValue((0, _fake.fakeOffer)());
            _mongoose.default.connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).get(`${offersRoute.path}/${offerId}`).expect(_constants.STATUS_CODES.SUCCESS);
        });
    });
    describe('[POST] /offers', ()=>{
        test('response Create Offers', async ()=>{
            const offerData = (0, _fake.fakeOffer)();
            const offersRoute = new _offersRoute.default();
            const offers = offersRoute.offersController.offerService.offers;
            offers.findOne = jest.fn().mockReturnValue(null);
            offers.create = jest.fn().mockReturnValue((0, _fake.fakeOffer)());
            _mongoose.default.connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).post(`${offersRoute.path}`).send(offerData).expect(201);
        });
    });
    describe('[PUT] /offers/:id', ()=>{
        test('response Update Offers', async ()=>{
            const offerId = '60706478aad6c9ad19a31c84';
            const offerData = (0, _fake.fakeOffer)();
            const offersRoute = new _offersRoute.default();
            const offers = offersRoute.offersController.offerService.offers;
            if (offerData.title) {
                offers.findOne = jest.fn().mockReturnValue((0, _fake.fakeOffer)());
            }
            offers.findByIdAndUpdate = jest.fn().mockReturnValue((0, _fake.fakeOffer)())(_mongoose.default).connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).put(`${offersRoute.path}/${offerId}`).send(offerData);
        });
    });
    describe('[DELETE] /offers/:id', ()=>{
        test('response Delete Offers', async ()=>{
            const offerId = '60706478aad6c9ad19a31c84';
            const offersRoute = new _offersRoute.default();
            const offers = offersRoute.offersController.offerService.offers;
            offers.findByIdAndDelete = jest.fn().mockReturnValue((0, _fake.fakeOffer)());
            _mongoose.default.connect = jest.fn();
            const app = new _app.default([
                offersRoute
            ]);
            return (0, _supertest.default)(app.getServer()).delete(`${offersRoute.path}/${offerId}`).expect(_constants.STATUS_CODES.SUCCESS);
        });
    });
});

//# sourceMappingURL=offers.test.js.map