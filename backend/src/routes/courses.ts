import express from 'express';
import { AdminRoute, LogedInRoute } from '../middlewares/rolesMiddleware';
import CoursesController from '../controllers/CoursesController';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', AdminRoute, CoursesController.getCourses);

router.get('/teacher', LogedInRoute, CoursesController.getCoursesForTeacher);

router.post(
  '/',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  CoursesController.postCourse,
);

router.delete('/:id', AdminRoute, CoursesController.deleteCourse);

router.put(
  '/:id',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  body('teacher_id').exists().withMessage('Teacher id is required'),
  body('group_id').exists().withMessage('Group id is required'),
  CoursesController.editCourse,
);

export default router;
