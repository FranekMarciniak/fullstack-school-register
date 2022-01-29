import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import DaysController from '../controllers/DaysController';

const router = express.Router();

router.get('/', DaysController.getDays);

router.post(
  '/',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  body('dayNumber').exists().withMessage('Day number is required'),
  DaysController.postDay,
);

router.delete('/:id', AdminRoute, DaysController.deleteDay);

router.put(
  '/:id',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  body('dayNumber').exists().withMessage('Day number is required'),
  DaysController.editDay,
);

export default router;
