export interface Offer {
  _id: string;
  title: string;
  date?: Date;
  description: string;
  price: string;
  offerType: OfferType;
  images: string[];
  daysOfTheWeek: string[];
}

export type OfferType = 'drink' | 'fruit' | 'food' | 'salad' | 'today';
export type CartType = 'cart' | 'favorites' | 'wishlist' | 'orders';
