import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignIn from './SignIn';
import { withRouter } from 'storybook-addon-react-router-v6';
import MockStoreProvider from '../../components/MockStoreProvider';

export default {
  title: 'Components/SignIn',
  component: SignIn,
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const Main = Template.bind({});
Main.decorators = [
  story => (
    <MockStoreProvider name='user' useStore initialState={null}>
      {story()}
    </MockStoreProvider>
  ),
];
