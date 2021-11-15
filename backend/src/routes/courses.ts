import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import CoursesController from '../controllers/CoursesController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', CoursesController.getCourses);

router.post(
  '/',
  body('name').exists().withMessage('Name is required'),
  CoursesController.postCourse,
);

router.delete('/:id', CoursesController.deleteCourse);

router.put(
  '/:id',
  body('name').exists().withMessage('Name is required'),
  body('teacher_id').exists().withMessage('Teacher id is required'),
  body('group_id').exists().withMessage('Group id is required'),
  CoursesController.editCourse,
);

export default router;
