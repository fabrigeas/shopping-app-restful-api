import { Router } from 'express';
import OffersController from '@controllers/offers.controller';
import { CreateOfferDto, UpdateOfferDto, PatchOfferDto } from '@dtos/offers.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class OffersRoute implements Routes {
  public path = '/api/offers';
  public router = Router();
  public offersController = new OffersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.offersController.getOffers);
    this.router.get(`${this.path}/:id`, this.offersController.getOfferById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateOfferDto, 'body'),
      this.offersController.createOffer,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateOfferDto, 'body', false),
      this.offersController.updateOffer,
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(PatchOfferDto, 'body', false),
      this.offersController.patchOffer,
    );
    this.router.delete(`${this.path}/:id`, this.offersController.deleteOffer);
  }
}

export default OffersRoute;
