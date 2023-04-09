import { User } from '../models/UserModel';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const isAvailable = await User.findOne({ email });
    if (isAvailable) return res.status(400).send('Email in use');

    const user = await User.create({ name, email, password });

    const userJwt = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    user.password = undefined!;
    res.cookie('jsonwebtoken', userJwt);
    res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(400).json({
        status: 'Fail',
        msg: 'Incorrect nickname or password',
      });
    }
    if (user) {
      const userJwt = jwt.sign(
        {
          _id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      user.password = undefined!;
      res.cookie('jsonwebtoken', userJwt);
      res.status(200).send(user);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const signOut = (req: Request, res: Response) => {
  try {
    res.clearCookie('jsonwebtoken');
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// test commit
