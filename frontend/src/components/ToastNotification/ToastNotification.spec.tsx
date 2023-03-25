import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import ToastNotification, { testId } from './ToastNotification';

let root: HTMLDivElement;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.removeChild(root);

  root.remove();
});

const id = `${new Date()}`;
const content = 'lorem ipsum';
const title = 'lorem';

test('default type', () => {
  act(() => {
    ReactDOM.createRoot(root).render(
      <ToastNotification id={id} content={content} title={title} />
    );
  });

  const dom = screen.getByTestId(testId);

  expect(dom.querySelector('.title')?.textContent).toEqual(title);
  expect(dom.querySelector('.content')?.textContent).toEqual(content);
});

describe.each(['lorem', 'ipsum', 'dolor'])('renders properties', title => {
  const content = `description ${title}`;
  test(`title:${title} content:${content}`, () => {
    act(() => {
      ReactDOM.createRoot(root).render(
        <ToastNotification id={id} content={content} title={title} />
      );
    });

    const dom = screen.getByTestId(testId);

    expect(dom.querySelector('.title')?.textContent).toEqual(title);
    expect(dom.querySelector('.content')?.textContent).toEqual(content);
  });
});
