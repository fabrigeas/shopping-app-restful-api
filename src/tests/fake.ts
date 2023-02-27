import { faker } from '@faker-js/faker';
import { OfferType } from '@interfaces/offer.interface';
import { CreateOfferDto } from '@dtos/offers.dto';

interface FakeOfferProps {
  title?: string;
  date?: Date;
  offerType?: OfferType;
  daysOfTheWeek?: string[];
}

const OFFER_TYPES: OfferType[] = ['food', 'drink', 'salad'];

export const fakeOffer = (props?: FakeOfferProps): CreateOfferDto => ({
  title: props?.title ?? faker.commerce.productName(),
  offerType: props?.offerType ?? faker.helpers.arrayElement<OfferType>(OFFER_TYPES),
  date: props?.date ?? faker.date.future(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  images: [],
  daysOfTheWeek:
    props?.daysOfTheWeek ??
    faker.helpers.arrayElements(['Mon', 'Tues', 'Wed', 'Thurs', 'Frid', 'Sat']),
});

export const fakeOfferList = (count: number, props?: FakeOfferProps) =>
  [...Array(count)].map(() => fakeOffer(props));
