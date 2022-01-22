import express from 'express';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import GroupsController from '../controllers/GroupsController';

const router = express.Router();

router.get('/', GroupsController.getGroups);

router.get('/teacher', GroupsController.getGroupsForTeacher);

router.post(
  '/',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  GroupsController.postGroup,
);

router.delete('/:id', AdminRoute, GroupsController.deleteGroup);

router.put(
  '/:id',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  GroupsController.editGroup,
);

export default router;
