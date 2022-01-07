import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import LessonsController from '../controllers/LessonsController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', LessonsController.getLessons);

router.post(
  '/',
  body('day_id').exists().withMessage('Day id is required'),
  body('course_id').exists().withMessage('Course id is required'),
  body('hour_id').exists().withMessage('Hour id is required'),
  body('classroom_id').exists().withMessage('Classroom id is required'),
  LessonsController.postLesson,
);

router.delete('/:id', LessonsController.deleteLesson);

// router.put(
//   '/:id',
//   body('day').exists().withMessage('Day is required'),
//   body('course_id').exists().withMessage('Course id is required'),
//   body('hour_id').exists().withMessage('Hour id is required'),
//   body('classroom_id').exists().withMessage('Classroom id is required'),
//   CoursesController.editCourse,
// );

export default router;
