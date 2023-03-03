import OffersController from './offers.controller';
import { Routes } from '../interfaces/routes.interface';
declare class OffersRoute implements Routes {
    path: string;
    router: any;
    offersController: OffersController;
    constructor();
    private initializeRoutes;
}
export default OffersRoute;
