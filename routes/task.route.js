import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewere/auth.js';
import { roles } from '../constant/role.js';

const taskRouter = express.Router();

taskRouter.post('/create', isAuthenticated, isAuthorized([roles.ADMIN, roles.MANAGER]));

export default taskRouter;