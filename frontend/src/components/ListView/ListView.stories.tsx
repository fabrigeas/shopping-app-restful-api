import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListView from './ListView';
import { fakeOfferList } from '../../fake';
import { withRouter } from 'storybook-addon-react-router-v6';
import MockStoreProvider from '../MockStoreProvider';
import { Offer } from '../../types';

export default {
  title: 'Components/ListView',
  component: ListView,
  argTypes: {
    items: {
      control: { type: 'select' },
      options: {
        '3 - items': fakeOfferList(2),
        '5 - items': fakeOfferList(5),
        '6 - items': fakeOfferList(6),
        '8 - items': fakeOfferList(8),
        '9 - items': fakeOfferList(9),
      },
    },
  },
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof ListView>;

const Template: ComponentStory<typeof ListView> = args => (
  <ListView {...args} />
);

const createStory = (items: Offer[]) => {
  const Primary = Template.bind({});
  Primary.decorators = [
    story => (
      <MockStoreProvider name='currentSheet' initialState={null}>
        {story()}
      </MockStoreProvider>
    ),
  ];
  Primary.args = {
    items,
  };

  return Primary;
};

export const UnScrolled = createStory(fakeOfferList(2));
export const Scrolled = createStory(fakeOfferList(6));
