import * as express from 'express';
import { Hour } from '../models/HoursModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
  conflict,
} from './BaseController';

const getHours = async (req: express.Request, res: express.Response) => {
  try {
    const allHours = await Hour.findAll({ order: [['periodNumber', 'ASC']] });
    return res.status(200).json(allHours);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postHour = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { periodNumber, intervalName } = req.body;
  const checkHour = await Hour.findOne({
    where: { periodNumber: periodNumber },
  });
  if (checkHour) {
    return conflict(res, 'Hour with this period number is already assigned');
  }
  try {
    const hourToSave = Hour.build({ periodNumber, intervalName });
    await hourToSave.save();
    return succsesJson(res, 201, 'Hour created', hourToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteHour = async (req: express.Request, res: express.Response) => {
  try {
    const hourToDelete = await Hour.findByPk(req.params.id);
    if (!hourToDelete) {
      return notFound(res, 'Hour not found');
    }
    await hourToDelete.destroy();
    return succsess(res, 200, 'Hour deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editHour = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { periodNumber, intervalName } = req.body;

  try {
    const hourToUpdate = await Hour.findByPk(req.params.id);
    if (!hourToUpdate) {
      return notFound(res, 'Hour not found');
    }
    await hourToUpdate.update({
      periodNumber,
      intervalName,
    });
    return succsess(res, 200, 'Updated succsessfully');
  } catch (err) {
    fail(res, err as Error);
  }
};

export default { getHours, postHour, deleteHour, editHour };
