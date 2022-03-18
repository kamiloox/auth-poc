import { Router } from 'express';
import { loginRouter } from './login';
import { registerRouter } from './register';

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);

export { authRouter };
