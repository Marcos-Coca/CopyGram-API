import { Response, Request } from 'express';
import { notFound } from '@hapi/boom';

export function notFoundHandler(req: Request, res: Response) {
  const {
    output: { statusCode, payload },
  } = notFound();

  res.status(statusCode).json(payload);
}
