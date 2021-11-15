import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import HoursController from '../controllers/HoursController';

const router = express.Router();

router.get('/', AdminRoute, HoursController.getHours);

router.post(
  '/',
  AdminRoute,
  body('periodNumber').exists().withMessage('Period number is required'),
  body('intervalName').exists().withMessage('Interval name is required'),
  HoursController.postHour,
);

router.delete('/:id', AdminRoute, HoursController.deleteHour);

router.put(
  '/:id',
  AdminRoute,
  body('periodNumber').exists().withMessage('Period number is required'),
  body('intervalName').exists().withMessage('Interval name is required'),
  HoursController.editHour,
);

export default router;
