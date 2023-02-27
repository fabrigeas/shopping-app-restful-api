import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { CreateOfferDto } from '@dtos/offers.dto';
import OffersRoute from '@routes/offers.route';
import { STATUS_CODES } from '@utils/constants';
import { fakeOfferList, fakeOffer } from './fake';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Offers', () => {
  const offersRoute = new OffersRoute();
  const offers = offersRoute.offersController.offerService.offers;

  describe('[GET] /offers', () => {
    test('response findAll Offers', async () => {
      offers.find = jest.fn().mockReturnValue(fakeOfferList(4));
      (mongoose as any).connect = jest.fn();
      const app = new App([offersRoute]);
      return request(app.getServer())
        .get(`${offersRoute.path}`)
        .expect(STATUS_CODES.SUCCESS);
    });

    test.each(['alpha', 'beta', 'charly'])(
      `response findAll Offers?title=%s`,
      async title => {
        offers.find = jest.fn().mockReturnValue([fakeOffer({ title }), fakeOfferList(2)]);
        (mongoose as any).connect = jest.fn();
        const app = new App([offersRoute]);
        return request(app.getServer())
          .get(`${offersRoute.path}`)
          .expect(STATUS_CODES.SUCCESS);
      },
    );
  });

  describe('[GET] /offers/:id', () => {
    test('response findOne Offers', async () => {
      const offerId = 'qpwoeiruty';

      const offersRoute = new OffersRoute();
      const offers = offersRoute.offersController.offerService.offers;

      offers.findOne = jest.fn().mockReturnValue(fakeOffer());

      (mongoose as any).connect = jest.fn();
      const app = new App([offersRoute]);
      return request(app.getServer())
        .get(`${offersRoute.path}/${offerId}`)
        .expect(STATUS_CODES.SUCCESS);
    });
  });

  describe('[POST] /offers', () => {
    test('response Create Offers', async () => {
      const offerData: CreateOfferDto = fakeOffer();
      const offersRoute = new OffersRoute();
      const offers = offersRoute.offersController.offerService.offers;
      offers.findOne = jest.fn().mockReturnValue(null);
      offers.create = jest.fn().mockReturnValue(fakeOffer());

      (mongoose as any).connect = jest.fn();
      const app = new App([offersRoute]);
      return request(app.getServer())
        .post(`${offersRoute.path}`)
        .send(offerData)
        .expect(201);
    });
  });

  describe('[PUT] /offers/:id', () => {
    test('response Update Offers', async () => {
      const offerId = '60706478aad6c9ad19a31c84';
      const offerData: CreateOfferDto = fakeOffer();
      const offersRoute = new OffersRoute();
      const offers = offersRoute.offersController.offerService.offers;

      if (offerData.title) {
        offers.findOne = jest.fn().mockReturnValue(fakeOffer());
      }

      offers.findByIdAndUpdate = jest.fn().mockReturnValue(fakeOffer())(
        mongoose as any,
      ).connect = jest.fn();
      const app = new App([offersRoute]);
      return request(app.getServer())
        .put(`${offersRoute.path}/${offerId}`)
        .send(offerData);
    });
  });

  describe('[DELETE] /offers/:id', () => {
    test('response Delete Offers', async () => {
      const offerId = '60706478aad6c9ad19a31c84';

      const offersRoute = new OffersRoute();
      const offers = offersRoute.offersController.offerService.offers;

      offers.findByIdAndDelete = jest.fn().mockReturnValue(fakeOffer());

      (mongoose as any).connect = jest.fn();
      const app = new App([offersRoute]);
      return request(app.getServer())
        .delete(`${offersRoute.path}/${offerId}`)
        .expect(STATUS_CODES.SUCCESS);
    });
  });
});
