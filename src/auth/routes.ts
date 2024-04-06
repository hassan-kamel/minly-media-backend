import { Router } from 'express';
import { validate } from '../shared/middlewares';
import { login, signup } from './controllers';
import { loginDataSchema, signupDataSchema } from './validations';

export const authRouter = Router();

authRouter.post('/signup', validate(signupDataSchema), signup);
authRouter.post('/login', validate(loginDataSchema), login);
