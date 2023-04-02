import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { STATUS_CODES } from '@utils/constants';
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { SECRET_KEY } from '@/config';

const MISSING_USER_DATA = 'userData is empty';
const HASH_LENGTH = 10;

export default {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;

      if (isEmpty(userData)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(MISSING_USER_DATA);
      }

      const duplicate: User = await userModel.findOne({ email: userData.email });

      if (duplicate) {
        res
          .status(STATUS_CODES.CONFLICT)
          .send(`This email ${userData.email} already exists`);
      }

      const password = await hash(userData.password, HASH_LENGTH);

      const user: User = await userModel.create({
        ...userData,
        password,
      });

      res.status(STATUS_CODES.CREATED).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;

      if (isEmpty(userData)) {
        return res.status(STATUS_CODES.SUCCESS).send(MISSING_USER_DATA);
      }

      const user: User = await userModel.findOne({ email: userData.email });

      if (!user) {
        return res
          .status(STATUS_CODES.CONFLICT)
          .send(`This email ${userData.email} was not found`);
      }

      const isPasswordMatching: boolean = await compare(userData.password, user.password);
      if (!isPasswordMatching) {
        return res.status(STATUS_CODES.CONFLICT).send('Password is not matching');
      }

      const tokenData = createToken(user);
      const cookie = createCookie(tokenData);

      res.status(STATUS_CODES.SUCCESS).json({ cookie, user, tokenData });
    } catch (error) {
      next(error);
    }
  },

  async signOut(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userData: User = req.user;
      if (isEmpty(userData)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(MISSING_USER_DATA);
      }

      const user: User = await userModel.findOne({
        email: userData.email,
        password: userData.password,
      });
      if (!user) {
        return res
          .status(STATUS_CODES.CONFLICT)
          .send(`This email ${userData.email} was not found`);
      }

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(STATUS_CODES.SUCCESS).json({ user, message: 'signed out' });
    } catch (error) {
      next(error);
    }
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const _id = req.params.id;
      const unhashedPwd = req.body.password;
      if (isEmpty(unhashedPwd)) {
        throw new HttpException(STATUS_CODES.SUCCESS, 'password missing');
      }

      const user: User = await userModel.findById(_id);

      if (!user) {
        return res
          .status(STATUS_CODES.CONFLICT)
          .send(`This user with ${_id} was not found`);
      }
      const password = await hash(unhashedPwd, HASH_LENGTH);
      await userModel.updateOne({ _id }, { password });

      res.status(STATUS_CODES.SUCCESS).json({ message: 'signed oou' });
    } catch (error) {
      next(error);
    }
  },
};

const createCookie = (token: TokenData): string => {
  return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn};`;
};

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  // TODO: replace secreKey with value from env
  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};
