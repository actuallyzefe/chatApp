import { User } from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Decoded, DevelopedRequest } from '../interfaces/AuthInterfaces';
import { IncomingHttpHeaders } from 'http';

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
  req: DevelopedRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  const headers = req.headers as unknown as IncomingHttpHeaders;
  //1) Getting token and check if it exists
  if (headers.authorization && headers.authorization.startsWith('Bearer')) {
    token = headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token!) {
    res.status(401).json({
      status: 'Fail',
      msg: 'You are not logged in',
    });
    next();
  }
  const decoded: Decoded = jwt.verify(
    token!,
    process.env.JWT_SECRET!
  ) as Decoded;
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: 'Fail',
      msg: 'The user is no longer exists',
    });
  }

  next();
};
