import * as express from 'express';
import { Classroom } from '../models/ClassroomModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  success,
  succsesJson,
} from './BaseController';

const getClassrooms = async (req: express.Request, res: express.Response) => {
  try {
    const allClassrooms = await Classroom.findAll();
    return res.status(200).json(allClassrooms);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postClassroom = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name } = req.body;
  try {
    const classroomToSave = Classroom.build({ name });
    await classroomToSave.save();
    return succsesJson(res, 201, 'Classroom created', classroomToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteClassroom = async (req: express.Request, res: express.Response) => {
  try {
    const classroomToDelete = await Classroom.findByPk(req.params.id);
    if (!classroomToDelete) {
      return notFound(res, 'Classroom not found');
    }
    await classroomToDelete.destroy();
    return success(res, 200, 'Classroom deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editClassroom = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name } = req.body;

  try {
    const classroomToUpdate = await Classroom.findByPk(req.params.id);
    if (!classroomToUpdate) {
      return notFound(res, 'Classroom not found');
    }
    await classroomToUpdate.update({
      name,
    });
    return success(res, 200, 'Updated successfully');
  } catch (err) {
    fail(res, err as Error);
  }
};

export default { getClassrooms, postClassroom, deleteClassroom, editClassroom };
