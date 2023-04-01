import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(userPass: string, hashedPass: string): Promise<boolean>;
}
