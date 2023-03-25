import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CompType } from '../../types/index';
import ToastNotification from './ToastNotification';

export default {
  title: 'Components/ToastNotification',
  component: ToastNotification,
  argTypes: {
    type: {
      controls: ['error', 'info', 'success', 'warning'] as CompType[],
    },
  },
} as ComponentMeta<typeof ToastNotification>;

const Template: ComponentStory<typeof ToastNotification> = args => (
  <ToastNotification {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 'info',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
};
