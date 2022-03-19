import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/env';

const ACCESS_TOKEN = getEnv('ACCESS_TOKEN_SECRET');

export const authMiddleware: RequestHandler = (req, res, next) => {
  const { access_token: accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ status: 401, message: 'access_token cookie cannot be found' });
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN);
    next();
  } catch {
    return res.status(403).json({ status: 403, message: 'Invalid access token' });
  }
};
