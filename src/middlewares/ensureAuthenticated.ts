import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import autoConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  /**
   * this way i can take just second value after space.
   * We are eliminit Bearer
   *
   * */
  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, autoConfig.jwt.secret);

    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
