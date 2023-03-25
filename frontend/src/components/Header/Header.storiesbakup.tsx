import React from 'react';
import { ComponentStory } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
};

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
