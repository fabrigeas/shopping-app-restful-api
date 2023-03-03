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
    fakeOffer: ()=>fakeOffer,
    fakeOfferList: ()=>fakeOfferList
});
const _faker = require("@faker-js/faker");
const OFFER_TYPES = [
    'food',
    'drink',
    'salad'
];
var _props_title, _props_offerType, _props_date, _props_daysOfTheWeek;
const fakeOffer = (props)=>{
    return {
        title: (_props_title = props === null || props === void 0 ? void 0 : props.title) !== null && _props_title !== void 0 ? _props_title : _faker.faker.commerce.productName(),
        offerType: (_props_offerType = props === null || props === void 0 ? void 0 : props.offerType) !== null && _props_offerType !== void 0 ? _props_offerType : _faker.faker.helpers.arrayElement(OFFER_TYPES),
        date: (_props_date = props === null || props === void 0 ? void 0 : props.date) !== null && _props_date !== void 0 ? _props_date : _faker.faker.date.future(),
        description: _faker.faker.commerce.productDescription(),
        price: _faker.faker.commerce.price(),
        images: [],
        daysOfTheWeek: (_props_daysOfTheWeek = props === null || props === void 0 ? void 0 : props.daysOfTheWeek) !== null && _props_daysOfTheWeek !== void 0 ? _props_daysOfTheWeek : _faker.faker.helpers.arrayElements([
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Frid',
            'Sat'
        ])
    };
};
const fakeOfferList = (count, props)=>[
        ...Array(count)
    ].map(()=>fakeOffer(props));

//# sourceMappingURL=fake.js.map