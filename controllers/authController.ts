import { User } from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SignUp
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Checking the email if that is in use
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).send('Email in use');

    const newUser = await User.create({ name, email, password });
    const token = signToken(newUser._id);
    newUser.password = undefined!;
    res.status(201).json({
      status: 'Success',
      token,
      data: newUser,
    });
  } catch (e: any) {
    res.status(400).json({
      status: 'Fail',
      msg: e.message,
    });
    console.log(e);
  }
};

// Login

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        status: 'Fail',
        msg: 'Please provide nickname password',
      });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(400).json({
        status: 'Fail',
        msg: 'Incorrect nickname or password',
      });
    }
    if (user) {
      user.password = undefined!;
      const token = signToken(user._id);
      res.status(200).json({
        status: 'Success',
        token,
        data: user,
      });
    }
  } catch (e: any) {
    res.status(400).json({
      status: 'Fail',
      msg: e.message,
    });
    console.log(e);
  }
};

// Route Protection
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
