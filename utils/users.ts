import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { User } from '../types/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_DB = path.join(DATA_DIR, 'users.json');

const isDefinedInFileSystem = async (path: string) => {
  try {
    await fs.access(path, constants.F_OK);

    return true;
  } catch {
    return false;
  }
};

export const initDb = async () => {
  const dirExists = await isDefinedInFileSystem(DATA_DIR);
  if (!dirExists) {
    await fs.mkdir(DATA_DIR);
  }

  const dbExists = await isDefinedInFileSystem(USERS_DB);
  if (!dbExists) {
    await fs.writeFile(USERS_DB, JSON.stringify([]));
    return [];
  }
};

export const getAllUsers = async () => {
  try {
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
