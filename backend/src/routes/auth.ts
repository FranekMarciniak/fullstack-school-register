import express from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

router.get('/', AuthController.getUser);

router.post('/', AuthController.loginUser);

router.post('/register', AuthController.createUser);

export default router;
