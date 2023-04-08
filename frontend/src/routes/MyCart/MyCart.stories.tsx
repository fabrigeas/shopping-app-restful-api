import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyCart from './MyCart';
import { withRouter } from 'storybook-addon-react-router-v6';
import store from '../../store';
import { Provider } from 'react-redux';
import NotificationProvider from '../../components/NotificationProvider';

export default {
  title: 'Components/MyCart',
  component: MyCart,
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof MyCart>;

const Template: ComponentStory<typeof MyCart> = () => <MyCart />;

export const Main = Template.bind({});

Main.decorators = [
  story => (
    <Provider store={store}>
      <NotificationProvider>{story()}</NotificationProvider>
    </Provider>
  ),
];
