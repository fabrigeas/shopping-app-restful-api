import { NextFunction, Request, Response } from 'express';
import { CreateOfferDto, UpdateOfferDto } from '@dtos/offers.dto';
import offerService from '@services/offers.service';
import { STATUS_CODES, STATUS_MESSAGE } from '@utils/constants';

class OffersController {
  public offerService = new offerService();

  public getOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offers = await this.offerService.findAllOffer(req.query);

      res.status(STATUS_CODES.SUCCESS).json({ offers, message: STATUS_MESSAGE.FIND_ALL });
    } catch (error) {
      next(error);
    }
  };

  public getOfferById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offer = await this.offerService.findOfferById(req.params.id);

      res.status(STATUS_CODES.SUCCESS).json({ offer, message: STATUS_MESSAGE.FIND_ONE });
    } catch (error) {
      next(error);
    }
  };

  public createOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offerData: CreateOfferDto = req.body;
      const offer = await this.offerService.createOffer(offerData);

      res.status(STATUS_CODES.CREATED).json({ offer, message: STATUS_MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public updateOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offerId: string = req.params.id;
      const offerData: UpdateOfferDto = req.body;
      const offer = await this.offerService.updateOffer(offerId, offerData);

      res.status(STATUS_CODES.SUCCESS).json({ offer, message: STATUS_MESSAGE.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  public patchOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offerId: string = req.params.id;
      const offerData: UpdateOfferDto = req.body;
      const offer = await this.offerService.patchOffer(offerId, offerData);

      res.status(STATUS_CODES.SUCCESS).json({ offer, message: STATUS_MESSAGE.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  public deleteOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offerId: string = req.params.id;
      const offer = await this.offerService.deleteOffer(offerId);

      res.status(STATUS_CODES.SUCCESS).json({ offer, message: STATUS_MESSAGE.DELETED });
    } catch (error) {
      next(error);
    }
  };
}

export default OffersController;
