"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const offerSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    images: [
        String
    ],
    daysOfTheWeek: [
        String
    ],
    description: String,
    offerType: {
        required: true,
        type: String,
        enum: [
            'drink',
            'food',
            'salad',
            'other'
        ]
    },
    price: String
}, {
    toJSON: {
        virtuals: true,
        transform: function(_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            var _ret_images;
            ret.images = (_ret_images = ret.images) !== null && _ret_images !== void 0 ? _ret_images : [];
        }
    }
});
const offerModel = (0, _mongoose.model)('Offer', offerSchema);
const _default = offerModel;

//# sourceMappingURL=offers.model.js.map