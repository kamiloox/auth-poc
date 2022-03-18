import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestWithBody, User } from '../../types/types';
import { getUser } from '../../utils/users';
import { getEnv } from '../../utils/env';

const loginRouter = Router();

const ACCESS_TOKEN = getEnv('ACCESS_TOKEN_SECRET');

loginRouter.post('/', async (req: RequestWithBody<User>, res) => {
  const { login, password } = req.body;
  console.log(res.locals.isAuthenticated);

  if (!login || !password) {
    return res.status(422).json({ status: 422, message: 'Provide login and password' });
  }

  try {
    const user = await getUser(login);

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ status: 404, message: 'Given password is invalid' });
    }

    const accessToken = jwt.sign({ login }, ACCESS_TOKEN);

    res
      .status(200)
      .json({ status: 200, message: 'User logged in correctly', data: { user, accessToken } });
  } catch (err) {
    console.error('Cannot login user', err);
    res.status(500).json({ status: 500, message: 'Cannot login user, server error' });
  }
});

export { loginRouter };
