import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { STATUS_MESSAGE, STATUS_CODES } from '@utils/constants';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user: User = await this.authService.signUp(userData);

      res.status(STATUS_CODES.CREATED).json({ user, message: STATUS_MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user } = await this.authService.signIn(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(STATUS_CODES.SUCCESS).json({ user: user, message: 'signed in' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const user: User = await this.authService.signOut(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(STATUS_CODES.SUCCESS).json({ user, message: 'signed out' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
