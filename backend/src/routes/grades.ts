import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { IsMyCourse } from '../middlewares/coursesMiddleware';
import { body } from 'express-validator';
import GradesController from '../controllers/GradesController';
const router = express.Router();

router.get('/course_id=:course_id', IsMyCourse, GradesController.getGrades);

router.post(
  '/',
  body('value').exists().withMessage('Grade value is required'),
  body('weight').exists().withMessage('Grade weight is required'),
  body('student_id').exists().withMessage('Student id is required'),
  body('course_id').exists().withMessage('Course id is required'),
  GradesController.postGrade,
);

// router.delete('/:id', DaysController.deleteGrade);

// router.put(
//   '/:id',
//   body('value').exists().withMessage('Grade value is required'),
//   body('weight').exists().withMessage('Grade weight is required'),
//   body('student_id').exists().withMessage('Student id is required'),
//   body('course_id').exists().withMessage('Course id is required'),
//   DaysController.editGrade,
// );

export default router;
