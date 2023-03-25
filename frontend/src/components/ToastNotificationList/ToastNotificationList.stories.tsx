import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToastNotificationList from './ToastNotificationList';
import { fakeToastNotificationList } from '../../fake';
import { ToastMessage } from '../../types';

export default {
  title: 'Components/ToastNotificationList',
  component: ToastNotificationList,
  argTypes: {
    notifications: {
      controls: [
        {
          content: 'content',
        } as ToastMessage,
      ],
    },
  },
} as ComponentMeta<typeof ToastNotificationList>;

const Template: ComponentStory<typeof ToastNotificationList> = args => (
  <ToastNotificationList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  notifications: fakeToastNotificationList(5),
};

export const Success = Template.bind({});
Success.args = {
  notifications: fakeToastNotificationList(2, { type: 'success' }),
};

export const Error = Template.bind({});
Error.args = {
  notifications: fakeToastNotificationList(2, { type: 'error' }),
};
