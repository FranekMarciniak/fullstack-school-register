import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/', AuthController.getUser);

router.post('/', AuthController.loginUser);

router.delete('/', AuthController.logout);
export default router;
