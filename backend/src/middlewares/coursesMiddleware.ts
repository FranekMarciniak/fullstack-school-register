import * as express from 'express';
import { IUser } from '../types/user';
import { clientError, unauthorized } from '../controllers/BaseController';
import { Course } from '../models/CourseModel';
import { Op } from 'sequelize';

export const IsMyCourse = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) return clientError(res, 'Not logged in');
  let course_id;
  if (req.params.course_id) {
    course_id = req.params.course_id;
  } else if (req.body.course_id) {
    course_id = req.body.course_id;
  }
  const course = await Course.findOne({
    where: {
      [Op.and]: [{ id: course_id }, { teacher_id: (req.user as IUser).id }],
    },
  });
  if (!course) {
    return unauthorized(res, 'You dont have permission to view this course');
  }
  next();
};

export const LogedInRoute = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) return clientError(res, 'Not logged in');
  next();
};
