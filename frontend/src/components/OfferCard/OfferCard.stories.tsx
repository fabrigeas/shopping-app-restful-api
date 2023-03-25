import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OfferCard from './OfferCard';
import { fakeOffer, fakeCartItem } from '../../fake';

export default {
  title: 'Components/OfferCard',
  component: OfferCard,
  argTypes: {
    data: {
      control: { type: 'select' },
      options: {
        offer: fakeOffer(),
        cartItem: fakeCartItem(),
      },
    },
  },
} as ComponentMeta<typeof OfferCard>;

const Template: ComponentStory<typeof OfferCard> = args => (
  <OfferCard {...args} />
);

export const Offer = Template.bind({});
Offer.args = {
  data: fakeOffer(),
};

export const CartItem = Template.bind({});
CartItem.args = {
  data: fakeCartItem(),
};
