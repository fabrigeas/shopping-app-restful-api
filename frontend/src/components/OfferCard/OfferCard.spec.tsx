import React from 'react';
import { screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import OfferCard from './OfferCard';
import { fakeOffer, fakeCartItem } from '../../fake';
import { OfferType } from '../../types';

const testId = 'offer-card';

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
  const offer = fakeOffer();

  act(() => {
    ReactDOM.createRoot(container).render(<OfferCard data={offer}></OfferCard>);
  });

  const dom = screen.getByTestId(testId);

  expect(dom).toBeInTheDocument();
  expect(dom.classList.contains('offer')).toBe(true);

  expect(
    (await screen.findByText(offer.description)).classList.contains(
      'description'
    )
  ).toBe(true);
  expect(
    (await screen.findByText(offer.title)).classList.contains('title')
  ).toBe(true);
});

it.each(['drink', 'food', 'fruit', 'salad'] as OfferType[])(
  'renders OfferType: "%s"',
  async offerType => {
    const data = fakeOffer({ offerType });

    act(() => {
      ReactDOM.createRoot(container).render(
        <OfferCard data={data}></OfferCard>
      );
    });

    expect(
      (await screen.findByTestId(testId)).classList.contains(offerType)
    ).toBe(true);
  }
);

it.each([0, 1, 4])('renders Quantity input when: %d"', quantity => {
  const data = fakeCartItem(quantity);

  act(() => {
    ReactDOM.createRoot(container).render(<OfferCard data={data}></OfferCard>);
  });

  const qttDom = document.querySelector('.order input') as HTMLInputElement;

  if (quantity) {
    expect(qttDom.value).toEqual(JSON.stringify(quantity));
  } else {
    expect(qttDom).toBeNull();
  }
});
