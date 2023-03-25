import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    outlined: { controls: [true, false] },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}>Hello</Button>
);

export const Outlined = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const Success = Template.bind({});
Success.args = {
  buttonType: 'success',
};

export const Info = Template.bind({});
Info.args = {
  buttonType: 'info',
};

export const Error = Template.bind({});
Error.args = {
  buttonType: 'error',
};
