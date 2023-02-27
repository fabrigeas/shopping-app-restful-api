import { model, Schema, Document } from 'mongoose';
import { Offer } from '@interfaces/offer.interface';

const offerSchema: Schema = new Schema<Offer>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: false },
    images: [String],
    daysOfTheWeek: [String],
    description: String,
    offerType: {
      required: true,
      type: String,
      enum: ['drink', 'food', 'salad', 'other'],
    },
    price: String,
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.images = ret.images ?? [];
      },
    },
  },
);

const offerModel = model<Offer & Document>('Offer', offerSchema);

export default offerModel;
