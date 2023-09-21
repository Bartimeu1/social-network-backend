import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  birthDate?: Date;
  avatar?: string;
}

export interface IToken {
  user: Types.ObjectId;
  refreshToken: string;
}
