import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';

const protectedRouter = Router();

protectedRouter.use(authMiddleware);

protectedRouter.get('/', (req, res) => {
  res.json('User is authenticated');
});

export { protectedRouter };
