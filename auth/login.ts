import { Router } from 'express';
import bcrypt from 'bcrypt';
import { RequestWithBody, User } from '../types/types';
import { getUser } from '../utils/users';

const loginRouter = Router();

loginRouter.post('/', async (req: RequestWithBody<User>, res) => {
  const { login, password } = req.body;

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

    res.status(200).json({ status: 200, message: 'User logged in correctly', data: { user } });
  } catch (err) {
    console.error('Cannot create user', err);
    res.status(500).json({ status: 500, message: 'Cannot create user, server error' });
  }
});

export { loginRouter };
