import { Router } from 'express';
import bcrypt from 'bcrypt';
import { RequestWithBody, User } from '../../types/types';
import { getUser, saveUser } from '../../utils/users';

const registerRouter = Router();

registerRouter.post('/', async (req: RequestWithBody<User>, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(422).json({ status: 422, message: 'Provide login and password' });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const isLoginTaken = !!(await getUser(login));

    if (isLoginTaken) {
      return res
        .status(409)
        .json({ status: 409, message: 'User exists, create another with different login' });
    }

    const user: User = { login, password: hashedPassword };
    await saveUser(user);

    res.status(200).json({ status: 200, message: 'User successfully created', data: { user } });
  } catch (err) {
    console.error('Cannot create user', err);
    res.status(500).json({ status: 500, message: 'Cannot create user, server error' });
  }
});

export { registerRouter };
