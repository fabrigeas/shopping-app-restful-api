import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListView from './ListView';
import { fakeOfferList } from '../../fake';

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
} as ComponentMeta<typeof ListView>;

const Template: ComponentStory<typeof ListView> = args => (
  <ListView {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  items: fakeOfferList(6),
};
