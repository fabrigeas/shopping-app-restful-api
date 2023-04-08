import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignUp from './SignUp';
import { withRouter } from 'storybook-addon-react-router-v6';
import MockStoreProvider from '../../components/MockStoreProvider';

export default {
  title: 'Components/SignUp',
  component: SignUp,
  decorators: [story => <div>{story()}</div>, withRouter],
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = () => <SignUp />;

export const Main = Template.bind({});
Main.decorators = [
  story => (
    <MockStoreProvider name='user' useStore initialState={null}>
      {story()}
    </MockStoreProvider>
  ),
];
