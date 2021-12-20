import * as express from 'express';
import { Course } from '../models/CourseModel';
import { validationResult } from 'express-validator';
import { User } from '../models/UserModel';
import { Group } from '../models/GroupModel';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
} from './BaseController';

const getCourses = async (req: express.Request, res: express.Response) => {
  try {
    const allCourses = await Course.findAll({
      include: [
        { model: User, as: 'teacher' },
        { model: Group, as: 'group' },
      ],
    });
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

const deleteCourse = async (req: express.Request, res: express.Response) => {
  try {
    const courseToDelete = await Course.findByPk(req.params.id);
    if (!courseToDelete) {
      return notFound(res, 'Course not found');
    }
    await courseToDelete.destroy();
    return succsess(res, 200, 'Course deleted');
  } catch (err) {
    return fail(res, err as Error);
  }
};

const editCourse = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name, teacher_id, group_id } = req.body;
  try {
    const courseToUpdate = await Course.findByPk(req.params.id);
    if (!courseToUpdate) {
      return notFound(res, 'Course not found');
    }
    await courseToUpdate.update({ name, teacher_id, group_id });
    return succsess(res, 200, 'Updated succsessfully');
  } catch (err) {
    return fail(res, err as Error);
  }
};
export default { getCourses, postCourse, deleteCourse, editCourse };
