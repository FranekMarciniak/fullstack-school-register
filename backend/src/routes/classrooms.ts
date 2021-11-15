import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import ClassroomsController from '../controllers/ClassroomsController';

const router = express.Router();

router.get('/', AdminRoute, ClassroomsController.getClassrooms);

router.post(
  '/',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  ClassroomsController.postClassroom,
);

router.delete('/:id', AdminRoute, ClassroomsController.deleteClassroom);

router.put(
  '/:id',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  ClassroomsController.editClassroom,
);

export default router;
