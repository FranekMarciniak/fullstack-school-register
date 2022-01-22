import * as express from 'express';
import { Grade } from '../models/GradeModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
  conflict,
} from './BaseController';
import { User } from '../models/UserModel';

const getGrades = async (req: express.Request, res: express.Response) => {
  try {
    const { course_id } = req.params;
    const allGrades = await User.findAll({
      include: [{ model: Grade, where: { course_id }, required: true }],
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role'],
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

// const deleteDay = async (req: express.Request, res: express.Response) => {
//   try {
//     const dayToDelete = await Day.findByPk(req.params.id);
//     if (!dayToDelete) {
//       return notFound(res, 'Day not found');
//     }
//     await dayToDelete.destroy();
//     return succsess(res, 200, 'Day deleted');
//   } catch (err) {
//     fail(res, err as Error);
//   }
// };

// const editDay = async (req: express.Request, res: express.Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return clientError(res, errors.array()[0].msg);
//   }
//   const { name, dayNumber } = req.body;

//   try {
//     const dayToUpdate = await Day.findByPk(req.params.id);
//     if (!dayToUpdate) {
//       return notFound(res, 'Day not found');
//     }
//     await dayToUpdate.update({
//       name,
//       dayNumber,
//     });
//     return succsess(res, 200, 'Updated succsessfully');
//   } catch (err) {
//     fail(res, err as Error);
//   }
// };

export default { getGrades, postGrade };
