import * as express from 'express';
import { Course } from '../models/CourseModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
} from './BaseController';

const getCourses = async (req: express.Request, res: express.Response) => {
  try {
    const allCourses = await Course.findAll();
    return res.status(200).json(allCourses);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postCourse = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name, teacher_id, group_id } = req.body;

  try {
    const courseToSave = Course.build({
      name,
      teacher_id: teacher_id ? teacher_id : null,
      group_id: group_id ? group_id : null,
    });
    await courseToSave.save();
    return succsesJson(res, 201, 'Course created', courseToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

export default { getCourses, postCourse };
