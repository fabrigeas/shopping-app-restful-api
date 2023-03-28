import { Router } from 'express';
import service from '@services/auth.service';
import { CreateUserDto, UpdatePasswordDto, UserSignInDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/sign-up`,
      validationMiddleware(CreateUserDto, 'body'),
      service.signUp,
    );
    this.router.put(
      `${this.path}/password/:id`,
      validationMiddleware(UpdatePasswordDto, 'body'),
      service.updatePassword,
    );
    this.router.post(
      `${this.path}/sign-in`,
      validationMiddleware(UserSignInDto, 'body'),
      service.signIn,
    );
    this.router.post(`${this.path}/sign-out`, authMiddleware, service.signOut);
  }
}

export default AuthRoute;
