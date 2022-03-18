import { Request } from 'express';

export interface User {
  login: string;
  password: string;
}

export type RequestWithBody<T> = Request<{}, {}, Partial<T>>;
