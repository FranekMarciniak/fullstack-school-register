import express from 'express';
import AuthController from '../controllers/AuthController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', AuthController.getUser);

router.post('/', AuthController.loginUser);

router.delete('/', AuthController.logout);
export default router;
