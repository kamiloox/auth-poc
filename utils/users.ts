import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { User } from '../types/types';

const USERS_DB = path.join(process.cwd(), 'data', 'users.json');

const checkDbExistence = async () => {
  try {
    await fs.access(USERS_DB, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const dbExists = await checkDbExistence();
    if (!dbExists) {
      await fs.writeFile(USERS_DB, JSON.stringify([]));
      return [];
    }
    const content = await fs.readFile(USERS_DB, 'utf-8');
    const users = JSON.parse(content) as User[];
    return users;
  } catch (err) {
    console.error('Cannot read users', err);
    return [];
  }
};

export const saveUser = async (user: User) => {
  try {
    const users = await getAllUsers();
    const updatedUsers = [...users, user];

    await fs.writeFile(USERS_DB, JSON.stringify(updatedUsers));

    return true;
  } catch (err) {
    console.error('Cannot save user', err);
    return false;
  }
};

export const getUser = async (login: string) => {
  const users = await getAllUsers();

  const user = users.find((user) => user.login === login);

  return user;
};
