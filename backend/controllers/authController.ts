import { User } from '../models/UserModel';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/SchemaInterfaces';
import { Cookie } from 'express-session';
import { nextTick } from 'process';

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  res: Response,
  next: NextFunction
) => {
  const token = signToken(user._id);

  const cookieOptions: Cookie = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    originalMaxAge: null,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jsonwebtoken', token, cookieOptions as CookieOptions);
  user.password = undefined!;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
  next();
};

// SignUp
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    // Checking the email if that is in use
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).send('Email in use');

    const newUser = await User.create({ name, email, password });

    createSendToken(newUser, 201, res, next);
    next();
  } catch (e: any) {
    res.status(400).json({
      status: 'Fail',
      msg: e.message,
    });
    console.log(e);
    next();
  }
  next();
};

// Login

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      createSendToken(user, 200, res, next);
      next();
    }
    next();
  } catch (e: any) {
    res.status(400).json({
      status: 'Fail',
      msg: e.message,
    });
    console.log(e);
    next();
  }
  next();
};

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('jsonwebtoken');
    res.sendStatus(200);
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
  next();
};

// test commit
