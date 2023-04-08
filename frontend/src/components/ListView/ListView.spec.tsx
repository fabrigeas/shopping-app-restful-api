import React from 'react';
import { screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ListView from './ListView';
import { fakeOfferList } from '../../fake';

const testId = 'list-view';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

it('renders', async () => {
  const items = fakeOfferList(3);

  act(() => {
    ReactDOM.createRoot(container).render(<ListView items={items}></ListView>);
  });

  const dom = screen.getByTestId(testId);

  expect(dom).toBeInTheDocument();
  expect(dom.classList.contains('list-view')).toBe(true);

  // expect(
  //   (await screen.findByText(offer.description)).classList.contains(
  //     'description'
  //   )
  // ).toBe(true);
  // expect(
  //   (await screen.findByText(offer.title)).classList.contains('title')
  // ).toBe(true);
});

// it.each(['drink', 'food', 'fruit', 'salad'] as OfferType[])(
//   'renders OfferType: "%s"',
//   async offerType => {
//     const data = fakeOffer({ offerType });

//     act(() => {
//       ReactDOM.createRoot(container).render(<ListView data={data}></ListView>);
//     });

//     expect(
//       (await screen.findByTestId(testId)).classList.contains(offerType)
//     ).toBe(true);
//   }
// );

// describe('Pagination', () => {
//   it('renders default class', () => {
//     const items = fakeOfferList(1);

//     act(() => {
//       ReactDOM.createRoot(container).render(<ListView items={items} />);
//     });
//     const { pageSize, currentPage } = wrapper.vm;

//     expect(pageSize).toBe(3);
//     expect(currentPage).toBe(1);
//   });

// it.each([
//   { count: 3, numberOfPages: 1 },
//   { count: 6, numberOfPages: 2 },
//   { count: 7, numberOfPages: 3 },
// ])('%s', ({ numberOfPages, count }) => {
//   const items = fakeOfferList(count);

//   const wrapper = mount(ListView, {
//     shallow: true,
//     props: {
//       items,
//     },
//   });

//   expect(wrapper.vm.numberOfPages).toBe(numberOfPages);
// });

// test('toggle arrow buttons', async () => {
//   const items = fakeOfferList(30);
//   const wrapper = mount(ListView, {
//     shallow: true,
//     props: {
//       items,
//     },
//   });
//   const { vm } = wrapper;
//   const next = '.next-page';
//   const prev = '.previous-page';

//   expect(vm.currentPage).toBe(1);
//   expect(wrapper.find('.pagination ul').text()).toBe('12345678910❯');

//   for await (const i of {
//     async *[Symbol.asyncIterator]() {
//       yield 1;
//       yield 2;
//       yield 3;
//     },
//   }) {
//     // first 3 pages
//     await wrapper.find(`.page-${i}`).trigger('click');
//     expect(wrapper.find(prev).exists()).toBe(false);
//     expect(wrapper.find(next).exists()).toBe(true);

//     // last 3 pages
//     await wrapper.find(`.page-${10 - i}`).trigger('click');
//     expect(wrapper.find(prev).exists()).toBe(true);
//     expect(wrapper.find(next).exists()).toBe(false);
//   }
// });
// });
