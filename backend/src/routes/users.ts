import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.get('/', AdminRoute, UsersController.getUsers);

router.get('/teachers', AdminRoute, UsersController.getTeachers);

router.get('/students/:group', AdminRoute, UsersController.getUsersByGroup);

router.post(
  '/',
  AdminRoute,
  body('email').isEmail().withMessage('Email is incorrect'),
  body('username').exists().withMessage('Username is required'),
  body('firstName').exists().withMessage('First name is required'),
  body('lastName').exists().withMessage('Last name is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is too short'),
  UsersController.createUser,
);

router.get('/:id', AdminRoute, UsersController.getUser);

router.delete('/:id', AdminRoute, UsersController.deleteUser);

router.patch('/:id', AdminRoute, UsersController.editUser);

export default router;
