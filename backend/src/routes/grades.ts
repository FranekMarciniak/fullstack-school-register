import express from 'express';
import { IsMyCourse, LogedInRoute } from '../middlewares/coursesMiddleware';
import { body } from 'express-validator';
import GradesController from '../controllers/GradesController';
const router = express.Router();

router.get('/my', LogedInRoute, GradesController.getGradesForStudent);

router.get(
  '/course_id=:course_id',
  IsMyCourse,
  GradesController.getGradesForTeacher,
);

router.post(
  '/',
  IsMyCourse,
  body('value').exists().withMessage('Grade value is required'),
  body('weight').exists().withMessage('Grade weight is required'),
  body('student_id').exists().withMessage('Student id is required'),
  body('course_id').exists().withMessage('Course id is required'),
  GradesController.postGrade,
);

router.delete('/grade_id=:id', GradesController.deleteGrade);

router.put(
  '/grade_id=:id',
  IsMyCourse,
  body('value').exists().withMessage('Grade value is required'),
  body('weight').exists().withMessage('Grade weight is required'),
  body('student_id').exists().withMessage('Student id is required'),
  body('course_id').exists().withMessage('Course id is required'),
  body('description').exists().withMessage('Description is required'),
  GradesController.editGrade,
);

export default router;
