import offerService from '../services/offers.service';
declare class OffersController {
    offerService: offerService;
    getOffers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOfferById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    patchOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteOffer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default OffersController;
