import * as express from 'express';
import { IUser } from '../types/user';
import { clientError, unauthorized } from '../controllers/BaseController';

export const TeacherRoute = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) return clientError(res, 'Not logged in');
  const { role } = req.user as IUser;
  if (role !== 'student') {
    return unauthorized(res, 'This route requires teacher or admin access');
  }
  next();
};
