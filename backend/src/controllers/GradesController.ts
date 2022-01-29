import * as express from 'express';
import { Grade } from '../models/GradeModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsesJson,
  succsess,
} from './BaseController';
import { User } from '../models/UserModel';
import { Course } from '../models/CourseModel';
import { Group } from '../models/GroupModel';
import { IUser } from '../types/user';

const getGradesForTeacher = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { course_id } = req.params;
    const allGrades = await User.findAll({
      include: [
        {
          model: Grade,
          where: { course_id },
          required: false,
        },
        {
          model: Group,
          include: [
            { model: Course, where: { id: course_id }, required: true },
          ],
          required: true,
        },
      ],
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role'],
    });
    return res.status(200).json(allGrades);
  } catch (err) {
    fail(res, err as Error);
  }
};

const getGradesForStudent = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const allGrades = await Course.findAll({
      include: [
        {
          model: Grade,
          where: {
            student_id: (req.user as IUser).id,
          },
          required: false,
        },
        {
          model: Group,
          as: 'group',
          where: {
            id: (req.user as IUser).group_id,
          },
          required: true,
        },
      ],
    });
    return res.status(200).json(allGrades);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postGrade = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { value, weight, student_id, course_id, description } = req.body;
  try {
    const gradeToSave = Grade.build({
      value,
      weight,
      student_id,
      course_id,
      description: description ? description : null,
    });
    await gradeToSave.save();
    return succsesJson(res, 201, 'Grade added', gradeToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteGrade = async (req: express.Request, res: express.Response) => {
  try {
    const gradeToDelete = await Grade.findByPk(req.params.id);
    if (!gradeToDelete) {
      return notFound(res, 'Grade not found');
    }
    await gradeToDelete.destroy();
    return succsess(res, 200, 'Grade deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editGrade = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }

  const { value, weight, student_id, course_id, description } = req.body;

  try {
    const gradeToUpdate = await Grade.findByPk(req.params.id);
    if (!gradeToUpdate) {
      return notFound(res, 'Day not found');
    }
    gradeToUpdate.update({
      value,
      weight,
      student_id,
      course_id,
      description,
    });
    return succsesJson(
      res,
      200,
      'Updated succsessfully',
      gradeToUpdate.dataValues,
    );
  } catch (err) {
    fail(res, err as Error);
  }
};

export default {
  getGradesForTeacher,
  getGradesForStudent,
  postGrade,
  editGrade,
  deleteGrade,
};
