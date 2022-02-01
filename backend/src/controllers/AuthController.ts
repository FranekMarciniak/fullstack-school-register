import * as express from 'express';
import { passport } from '../index';
import { notFound, success } from './BaseController';

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
        res.status(200).json(user);
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

const logout = (req: express.Request, res: express.Response) => {
  req.logOut();
  res.status(200).clearCookie('connect.sid', {
    path: '/',
  });
  req.session.destroy(function (err) {
    return success(res, 200, 'Deleted session');
  });
};
export default { loginUser, getUser, logout };
