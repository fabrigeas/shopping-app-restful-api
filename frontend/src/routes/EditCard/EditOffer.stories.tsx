import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditOffer from './EditOffer';
import { withRouter } from 'storybook-addon-react-router-v6';
import MockStoreProvider from '../../components/MockStoreProvider';
import { fakeOffer } from '../../fake';

export default {
  title: 'Components/EditOffer',
  component: EditOffer,
  decorators: [story => <div>{story()}</div>, withRouter],
  parameters: {
    reactRouter: {
      routePath: '/offers/:id',
      routeParams: { id: '1' },
      loader: () => fakeOffer(),
    },
  },
} as ComponentMeta<typeof EditOffer>;

const Template: ComponentStory<typeof EditOffer> = () => <EditOffer />;

export const Main = Template.bind({});

Main.decorators = [
  story => (
    <MockStoreProvider name='offer' initialState={fakeOffer()}>
      {story()}
    </MockStoreProvider>
  ),
];
