import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, UserSignInDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/sign-up`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp,
    );
    this.router.post(
      `${this.path}/sign-in`,
      validationMiddleware(UserSignInDto, 'body'),
      this.authController.logIn,
    );
    this.router.post(`${this.path}/sign-out`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
