import { User } from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
// // import { IncomingHttpHeaders } from 'http';
// // import { DevelopedRequest, Decoded } from '../interfaces/AuthInterfaces';

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const cookieExpire = process.env.JWT_COOKE_EXPIRES_IN;

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  if (cookieExpire) {
    //@ts-ignore
    const cookieOptions: Cookie = {
      //@ts-ignore
      expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jsonwebtoken', token, cookieOptions);
  }
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
// Remove password from output

// SignUp
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Checking the email if that is in use
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).send('Email in use');

    const newUser = await User.create({ name, email, password });
    createSendToken(newUser, 201, res);
    // const token = jwt.sign(
    //   {
    //     _id: newUser._id,
    //     email: newUser.email,
    //   },
    //   process.env.JWT_KEY!
    // );
    // newUser.password = undefined!;
    // res.cookie('jsonwebtoken', token);
    // res.status(201).json({
    //   status: 'Fail',
    //   data: {
    //     user: newUser,
    //     token,
    //   },
    // });
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
      const token = jwt.sign(
        {
          _id: user.id,
        },
        process.env.JWT_KEY!
      );
      user.password = undefined!;
      res.cookie('jsonwebtoken', token);

      res.status(200).json({
        status: 'Success',
        data: {
          user: user,
          token,
        },
      });
    }
    // createSendToken(user, 200, res);
  } catch (e: any) {
    res.status(400).json({
      status: 'Fail',
      msg: e.message,
    });
    console.log(e);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('jsonwebtoken');
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error);
  }
};
