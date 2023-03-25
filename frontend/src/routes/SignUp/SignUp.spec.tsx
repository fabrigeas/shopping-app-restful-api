import React from 'react';
import { screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import SignUp, { testId } from './SignUp';

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.removeChild(root);
  root.remove();
});

it('renders', () => {
  act(() => {
    ReactDOM.createRoot(root).render(<SignUp />);
  });

  expect(screen.getByTestId(testId).textContent?.replace(/ /g, '')).toContain(
    'SigninEmail:Passowrd:signin'
  );
});
