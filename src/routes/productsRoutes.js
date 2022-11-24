import express from 'express';
import productsController from '../controllers/productsController.js';
import { checkjwt } from '../middlewares/checkjwt.js';
import validateProduct from '../middlewares/productValidation.js';

const productsRouter = express.Router();

productsRouter.post('/products', [checkjwt, validateProduct], productsController?.store);
productsRouter.get('/products', [checkjwt], productsController?.find);

export default productsRouter;