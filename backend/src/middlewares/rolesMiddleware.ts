import * as express from 'express';
import { IUser } from '../types/user';
import { clientError, unauthorized } from '../controllers/BaseController';

export const AdminRoute = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) return clientError(res, 'Not logged in');
  const { role } = req.user as IUser;
  if (role !== 'admin') {
    return unauthorized(res, 'This route requires admin access');
  }
  next();
};
