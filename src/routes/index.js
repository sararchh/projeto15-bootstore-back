import express from 'express';
import authRoutes from './authRoutes.js';
import productsRoutes from './productsRoutes.js';

const routes = express.Router();

routes.use(authRoutes);
routes.use(productsRoutes);

routes.get('/', (req, res, next) => {
  return res.status(200).json({ message: "Servidor em operacao" })
})


export default routes;