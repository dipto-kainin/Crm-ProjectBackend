import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewere/auth.js';
import { roles } from '../constant/role.js';
import { createClient, deleteClient, getClientById, getClients, updateClient } from '../controller/client.controller.js';

const clientRouter = express.Router();

clientRouter.post('/create', isAuthenticated, isAuthorized([roles.ADMIN, roles.MANAGER]), createClient);
clientRouter.put('/update/:clientId', isAuthenticated, isAuthorized([roles.ADMIN, roles.MANAGER]), updateClient);
clientRouter.delete('/delete/:clientId', isAuthenticated, isAuthorized([roles.ADMIN]), deleteClient);
clientRouter.get('/get-all-clients', isAuthenticated, isAuthorized([roles.ADMIN, roles.MANAGER]), getClients);
clientRouter.get('/get-client/:clientId', isAuthenticated, isAuthorized([roles.ADMIN, roles.MANAGER]), getClientById);

export default clientRouter;