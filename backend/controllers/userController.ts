import { NextFunction, Request, Response } from 'express';
import { User } from '../models/UserModel';

const filterObj = (obj: any, ...allowedFields: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const user = await User.findById({ _id: req.user?._id });
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        msg: 'User not found',
      });
    }
    const filteredBody = filterObj(req.body, 'name', 'email');
    const invalidEmail = await User.findOne({ email });
    if (invalidEmail) {
      return res.status(400).json({
        status: 'Fail',
        msg: 'Email in use',
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user?._id },
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'Success',
      data: updatedUser,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};
