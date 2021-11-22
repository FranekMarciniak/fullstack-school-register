import express from 'express';
import AuthController from '../controllers/AuthController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', AuthController.getUser);

router.post('/', AuthController.loginUser);

router.post(
  '/register',
  body('email').isEmail().withMessage('Email is incorrect'),
  body('username').exists().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is too short'),
  AuthController.createUser,
);
router.delete('/', AuthController.logout);
export default router;
