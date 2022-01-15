import express from 'express';
import { AdminRoute, LogedInRoute } from '../middlewares/rolesMiddleware';
import LessonsController from '../controllers/LessonsController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', LogedInRoute, LessonsController.getLessons);

router.get('/days/', LogedInRoute, LessonsController.getLessonsForAllDays);

router.get(
  '/days/group/:group',
  LogedInRoute,
  LessonsController.getLessonsForGroup,
);

router.post(
  '/',
  AdminRoute,
  body('day_id').exists().withMessage('Day id is required'),
  body('course_id').exists().withMessage('Course id is required'),
  body('hour_id').exists().withMessage('Hour id is required'),
  body('classroom_id').exists().withMessage('Classroom id is required'),
  LessonsController.postLesson,
);

router.delete('/:id', AdminRoute, LessonsController.deleteLesson);

export default router;
