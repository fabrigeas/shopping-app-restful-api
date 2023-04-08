import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from './Home';
import { withRouter } from 'storybook-addon-react-router-v6';
import { fakeUser } from '../../fake';
import { Provider } from 'react-redux';
import { User } from '../../types';
import { store } from '../../store';
import NotificationProvider from '../../components/NotificationProvider';

export default {
  title: 'Components/Home',
  component: Home,
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => <Home />;

const createStory = (user?: User) => {
  const clone = Template.bind({});

  clone.decorators = [
    story => (
      <Provider store={store}>
        <NotificationProvider>{story()}</NotificationProvider>
      </Provider>
    ),
  ];

  return clone;
};

export const Main = createStory();
export const Admin = createStory(
  fakeUser({ email: 'mamdjotresia99@gmail.com' })
);
