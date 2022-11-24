import express from 'express';
import authRoutes from './authRoutes.js';
import productsRoutes from './productsRoutes.js';

const routes = express.Router();

routes.use(authRoutes);
routes.use(productsRoutes);

export default routes;