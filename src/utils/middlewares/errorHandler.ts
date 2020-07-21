import { Response, NextFunction, Request } from 'express';
import { Boom, Payload, badImplementation } from '@hapi/boom';
import config from '../../config/index';

function withErrorStack(error: Payload, stack: string | undefined) {
  if (config.env) {
    return { ...error, stack };
  }

  return error;
}

export function logErrors(err: Boom, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  next(err);
}

export function wrapErrors(err: any, req: Request, res: Response, next: NextFunction) {
  if (!err.isBoom) {
    next(badImplementation(err));
  }

  next(err);
}

export function errorHandler(err: Boom, req: Request, res: Response, next: NextFunction) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}
