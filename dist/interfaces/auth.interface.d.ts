import { Request } from 'express';
import { User } from './users.interface';
export interface DataStoredInToken {
    _id: string;
}
export interface TokenData {
    token: string;
    expiresIn: number;
}
export interface RequestWithUser extends Request {
    cookies: any;
    header: any;
    user: User;
}
