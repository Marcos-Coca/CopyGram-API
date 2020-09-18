import { Schema } from '@hapi/joi';
import { NextFunction, Response } from 'express';
import { badRequest } from '@hapi/boom';

function validate(data: Object, schema: Schema) {
  const { error } = schema.validate(data);
  return error;
}

export function validationHandler(schema: Schema, check: string = 'body') {
  return function (req: any, res: Response, next: NextFunction): void {
    const error = validate(req[check], schema);
    return error ? next(badRequest()) : next();
  };
}
