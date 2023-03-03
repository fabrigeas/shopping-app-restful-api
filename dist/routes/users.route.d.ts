import UsersController from '../controllers/users.controller';
import { Routes } from '../interfaces/routes.interface';
declare class UsersRoute implements Routes {
    path: string;
    router: any;
    usersController: UsersController;
    constructor();
    private initializeRoutes;
}
export default UsersRoute;
