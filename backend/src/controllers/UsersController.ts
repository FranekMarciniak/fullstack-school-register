import * as express from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import {
  clientError,
  fail,
  notFound,
  succsess,
  conflict,
} from './BaseController';
import { User } from '../models/UserModel';

const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role'],
    });
    return res.status(200).json(allUsers);
  } catch (err) {
    fail(res, err as Error);
  }
};

const createUser = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }

  const { username, password, email, firstName, lastName, role } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (user) {
      return conflict(res, 'User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToSave = User.build({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role ? role : 'student',
    });
    await userToSave.save();
    return succsess(res, 201, 'User created!');
  } catch (error) {
    return fail(res, error as Error);
  }
};

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role'],
    });
    if (!user) {
      return notFound(res, 'User not found');
    }
    return res.status(200).json(user);
  } catch (err) {
    fail(res, err as Error);
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    if (!userToDelete) {
      return notFound(res, 'User not found');
    }
    await userToDelete.destroy();
    return succsess(res, 200, 'User deleted');
  } catch (err) {
    fail(res, err as Error);
  }
};

const editUser = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }

  const { username, email, firstName, lastName, role } = req.body;

  try {
    const userToUpdate = await User.findByPk(req.params.id);
    if (!userToUpdate) {
      return notFound(res, 'Group not found');
    }
    await userToUpdate.update({
      username: username ? username : userToUpdate.get('username'),
      email: email ? email : userToUpdate.get('email'),
      firstName: firstName ? firstName : userToUpdate.get('firstName'),
      lastName: lastName ? lastName : userToUpdate.get('lastName'),
      role: role ? role : userToUpdate.get('role'),
    });
    return succsess(res, 200, 'Updated succsessfully');
  } catch (err) {
    fail(res, err as Error);
  }
};

const getTeachers = async (req: express.Request, res: express.Response) => {
  try {
    const allTeachers = await User.findAll({
      where: { role: 'teacher' },
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role'],
    });
    return res.status(200).json(allTeachers);
  } catch (err) {
    fail(res, err as Error);
  }
};

export default {
  getTeachers,
  getUsers,
  getUser,
  deleteUser,
  editUser,
  createUser,
};
