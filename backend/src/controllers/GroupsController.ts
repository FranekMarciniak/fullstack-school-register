import * as express from 'express';
import { Group } from '../models/GroupModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
} from './BaseController';

const getGroups = async (req: express.Request, res: express.Response) => {
  try {
    const allGroups = await Group.findAll();
    return res.status(200).json(allGroups);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postGroup = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name } = req.body;
  try {
    const groupToSave = Group.build({ name });
    await groupToSave.save();
    return succsesJson(res, 201, 'Group created', groupToSave);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteGroup = async (req: express.Request, res: express.Response) => {
  try {
    const groupToDelete = await Group.findByPk(req.params.id);
    if (!groupToDelete) {
      return notFound(res, 'Group not found');
    }
    await groupToDelete.destroy();
    return succsess(res, 200, 'Group deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editGroup = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { name } = req.body;

  try {
    const groupToUpdate = await Group.findByPk(req.params.id);
    if (!groupToUpdate) {
      return notFound(res, 'Group not found');
    }
    await groupToUpdate.update({
      name,
    });
    return succsess(res, 200, 'Updated succsessfully');
  } catch (err) {
    fail(res, err as Error);
  }
};

export default { getGroups, postGroup, deleteGroup, editGroup };
