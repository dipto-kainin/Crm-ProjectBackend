import express from 'express';

const dashboardRouter = express.Router();

dashboardRouter.get('/overview');

export default dashboardRouter;