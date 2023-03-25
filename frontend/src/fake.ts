import { faker } from '@faker-js/faker';
import { OFFER_TYPES } from './constants';
import { OfferType, Offer, CartItem, CompType, ToastMessage } from './types';

interface FakeOfferProps {
  title?: string;
  date?: Date;
  offerType?: OfferType;
  daysOfTheWeek?: string[];
}

export interface FakeCartItemProps extends FakeOfferProps {
  quantity?: number;
}

export const fakeOffer = (props?: FakeOfferProps): Offer => ({
  id: faker.database.mongodbObjectId(),
  title: props?.title ?? faker.commerce.productName(),
  date: props?.date ?? faker.date.future(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  offerType:
    props?.offerType ?? faker.helpers.arrayElement<OfferType>(OFFER_TYPES),
  images: [...Array(3)].map(() => faker.image.image()),
  daysOfTheWeek:
    props?.daysOfTheWeek ??
    faker.helpers.arrayElements(['Mon', 'Tues', 'Wed', 'Thurs', 'Frid', 'Sat']),
});

export const fakeToastNotification = (props?: {
  type?: CompType;
}): ToastMessage => ({
  id: `${new Date()}`,
  title: faker.commerce.productName(),
  content: faker.commerce.productDescription(),
  type:
    props?.type ??
    faker.helpers.arrayElement([
      'error',
      'info',
      'success',
      'warning',
    ] as CompType[]),
  time: '5 mins',
});

export const fakeOfferList = (count: number, props?: FakeOfferProps) =>
  [...Array(count)].map(() => fakeOffer(props));

export const fakeCartItem = (props?: number | FakeCartItemProps): CartItem => {
  if (typeof props === 'undefined') {
    return {
      quantity: 2,
      offer: fakeOffer(),
    };
  }

  if (typeof props === 'number') {
    return {
      quantity: props,
      offer: fakeOffer(),
    };
  }

  return {
    quantity: 7,
    offer: fakeOffer(props),
  };
};

export const fakeCartItemList = (
  count?: number,
  props?: FakeCartItemProps
): CartItem[] => [...Array(count ?? 2)].map(() => fakeCartItem(props));

export const fakeToastNotificationList = (
  count: number,
  props?: { type?: CompType }
): ToastMessage[] => [...Array(count)].map(() => fakeToastNotification(props));
