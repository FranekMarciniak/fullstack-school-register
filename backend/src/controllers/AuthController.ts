import * as express from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';
import { passport } from '../index';
import { User } from '../models/UserModel';
import {
  clientError,
  conflict,
  fail,
  notFound,
  succsess,
} from './BaseController';

const createUser = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }

  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (user) {
      return conflict(res, 'User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToSave = User.build({
      username,
      email,
      password: hashedPassword,
    });
    await userToSave.save();
    return succsess(res, 201, 'User created!');
  } catch (error) {
    return fail(res, error as Error);
  }
};

const loginUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) notFound(res, info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        succsess(res, 200, 'Successfully Authenticated');
      });
    }
  })(req, res, next);
};

const getUser = (req: express.Request, res: express.Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    notFound(res, 'User not found');
  }
};

export default { createUser, loginUser, getUser };
