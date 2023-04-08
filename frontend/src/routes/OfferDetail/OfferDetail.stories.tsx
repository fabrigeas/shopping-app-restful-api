import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OfferDetail from './OfferDetail';
import { withRouter } from 'storybook-addon-react-router-v6';
import { fakeOffer } from '../../fake';
import { Provider } from 'react-redux';
import NotificationProvider from '../../components/NotificationProvider';
import store from '../../store';

export default {
  title: 'Components/OfferDetail',
  component: OfferDetail,
  decorators: [story => <div>{story()}</div>, withRouter],
  parameters: {
    reactRouter: {
      routePath: '/offers/:id',
      routeParams: { id: '1' },
      loader: () => fakeOffer(),
    },
  },
} as ComponentMeta<typeof OfferDetail>;

const Template: ComponentStory<typeof OfferDetail> = () => <OfferDetail />;

export const Main = Template.bind({});

Main.decorators = [
  story => (
    <Provider store={store}>
      <NotificationProvider>{story()}</NotificationProvider>
    </Provider>
  ),
];
