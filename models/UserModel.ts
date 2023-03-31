import { Schema, model } from 'mongoose';
// Created UserDcoument Interface
import { IUser } from '../interfaces/SchemaInterfaces';

import bcrypt from 'bcrypt';

// Created a userSchema corresponding to the UserDocument interface
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  userPass: string,
  hashedPass: string
): Promise<boolean> {
  return await bcrypt.compare(userPass, hashedPass);
};

export const User = model<IUser>('User', userSchema);
