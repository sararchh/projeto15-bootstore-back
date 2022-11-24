import express from 'express';
import AuthController from '../controllers/authController.js'
import validateUser from '../middlewares/userValidation.js';

const loginRouter = express.Router();

loginRouter.post('/sign-up', [validateUser], AuthController?.signUp);
loginRouter.post('/sign-in', AuthController?.signIn);

export default loginRouter;