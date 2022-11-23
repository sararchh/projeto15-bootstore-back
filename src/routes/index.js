import express from 'express';
import authRoutes from './authRoutes.js';

const routes = express.Router();

routes.use(authRoutes);
// routes.use(transactionRouter);

export default routes;