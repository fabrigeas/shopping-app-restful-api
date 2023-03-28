import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { STATUS_CODES } from '@utils/constants';

const MISSING_USER_DATA = 'userData is empty';
const HASH_LENGTH = 10;

class AuthService {
  public users = userModel;

  public async signUp(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData))
      throw new HttpException(STATUS_CODES.SUCCESS, MISSING_USER_DATA);

    const user: User = await this.users.findOne({ email: userData.email });
    if (user)
      throw new HttpException(
        STATUS_CODES.CONFLICT,
        `This email ${userData.email} already exists`,
      );

    const hashedPassword = await hash(userData.password, HASH_LENGTH);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async signIn(
    userData: CreateUserDto,
  ): Promise<{ cookie: string; user: User; tokenData: TokenData }> {
    if (isEmpty(userData))
      throw new HttpException(STATUS_CODES.SUCCESS, MISSING_USER_DATA);

    const user: User = await this.users.findOne({ email: userData.email });
    if (!user)
      throw new HttpException(
        STATUS_CODES.CONFLICT,
        `This email ${userData.email} was not found`,
      );

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching)
      throw new HttpException(STATUS_CODES.CONFLICT, 'Password is not matching');

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { cookie, user, tokenData };
  }

  public async signOut(userData: User): Promise<User> {
    if (isEmpty(userData))
      throw new HttpException(STATUS_CODES.BAD_REQUEST, MISSING_USER_DATA);

    const user: User = await this.users.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!user)
      throw new HttpException(
        STATUS_CODES.CONFLICT,
        `This email ${userData.email} was not found`,
      );

    return user;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = '';
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async updatePassword(_id: string, unhashedPwd: string) {
    if (isEmpty(unhashedPwd)) {
      throw new HttpException(STATUS_CODES.SUCCESS, 'password missing');
    }

    const user: User = await this.users.findById(_id);

    if (!user)
      throw new HttpException(
        STATUS_CODES.CONFLICT,
        `This user with ${_id} was not found`,
      );

    const password = await hash(unhashedPwd, HASH_LENGTH);
    await this.users.updateOne({ _id }, { password });

    return await this.users.findById(_id);
  }

  public createCookie(token: TokenData): string {
    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn};`;
  }
}

export default AuthService;
