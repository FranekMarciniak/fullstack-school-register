import express from 'express';
import AuthController from '../controllers/AuthController';
import { AdminRoute } from '../middlewares/rolesMiddleware';
import { body } from 'express-validator';
import GroupController from '../controllers/GroupController';

const router = express.Router();

router.get('/', AdminRoute, GroupController.getGroups);

router.post(
  '/',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  GroupController.postGroup,
);

router.delete('/:id', AdminRoute, GroupController.deleteGroup);

router.put(
  '/:id',
  AdminRoute,
  body('name').exists().withMessage('Name is required'),
  GroupController.editGroup,
);

export default router;
