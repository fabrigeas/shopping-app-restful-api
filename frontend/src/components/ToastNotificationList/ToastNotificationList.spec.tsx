import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import ToastNotificationList, { testId } from './ToastNotificationList';
import { fakeToastNotificationList } from '../../fake';

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.removeChild(root);
  root.remove();
});

test('props', () => {
  const count = 3;
  const notifications = fakeToastNotificationList(count);

  act(() => {
    createRoot(root).render(
      <ToastNotificationList notifications={notifications} />
    );
  });

  const dom = screen.getByTestId(testId);
  expect(dom).toBe(true);
});
