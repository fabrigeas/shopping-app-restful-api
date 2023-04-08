import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OfferCard from './OfferCard';
import { fakeOffer, fakeCartItem } from '../../fake';
import { Offer } from '../../types';
import MockStoreProvider from '../MockStoreProvider';
import { CartItem } from '../../types';
import { withRouter } from 'storybook-addon-react-router-v6';

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
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof OfferCard>;

const Template: ComponentStory<typeof OfferCard> = args => (
  <OfferCard {...args} />
);

const createStory = (data: Offer | CartItem) => {
  const Primary = Template.bind({});
  Primary.decorators = [
    story => (
      <MockStoreProvider name='currentSheet' initialState={null}>
        {story()}
      </MockStoreProvider>
    ),
  ];
  Primary.args = {
    data,
  };

  return Primary;
};

export const offer = createStory(fakeOffer());
export const cartItem = createStory(fakeCartItem());
