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

export default router;
