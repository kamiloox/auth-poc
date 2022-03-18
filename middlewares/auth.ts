import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/env';

const ACCESS_TOKEN = getEnv('ACCESS_TOKEN_SECRET');

export const authMiddleware: RequestHandler = (req, res, next) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(401).json({ status: 401, message: 'Provide access token to fulfill request' });
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN);
    next();
  } catch {
    return res.status(401).json({ status: 401, message: 'Invalid access token' });
  }
};
