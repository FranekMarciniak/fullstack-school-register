import * as express from 'express';
import { Day } from '../models/DayModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
} from './BaseController';

const getDays = async (req: express.Request, res: express.Response) => {
  try {
    const allDays = await Day.findAll();
    return res.status(200).json(allDays);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postDay = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name, dayNumber } = req.body;
  try {
    const dayToSave = Day.build({ name, dayNumber });
    await dayToSave.save();
    return succsesJson(res, 201, 'Day created', dayToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteDay = async (req: express.Request, res: express.Response) => {
  try {
    const dayToDelete = await Day.findByPk(req.params.id);
    if (!dayToDelete) {
      return notFound(res, 'Day not found');
    }
    await dayToDelete.destroy();
    return succsess(res, 200, 'Day deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editDay = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name, dayNumber } = req.body;

  try {
    const dayToUpdate = await Day.findByPk(req.params.id);
    if (!dayToUpdate) {
      return notFound(res, 'Day not found');
    }
    await dayToUpdate.update({
      name,
      dayNumber,
    });
    return succsess(res, 200, 'Updated succsessfully');
  } catch (err) {
    fail(res, err as Error);
  }
};

export default { getDays, postDay, deleteDay, editDay };