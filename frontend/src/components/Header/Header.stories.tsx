import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';
import MockStoreProvider from '../MockStoreProvider';
import { withRouter } from 'storybook-addon-react-router-v6';
import { User } from '../../types';
import { fakeUser } from '../../fake';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

const createStory = (user?: User) => {
  const Clone = Template.bind({});

  Clone.decorators = [
    story => (
      <MockStoreProvider name='user' initialState={user ?? null}>
        {story()}
      </MockStoreProvider>
    ),
  ];

  return Clone;
};

export const UnAuthenticated = createStory();
export const Authenticated = createStory(fakeUser());
