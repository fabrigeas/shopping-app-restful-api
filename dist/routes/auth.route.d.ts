import AuthController from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes.interface';
declare class AuthRoute implements Routes {
    path: string;
    router: any;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
export default AuthRoute;
