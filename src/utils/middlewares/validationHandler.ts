import { Schema, ObjectSchema } from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import { badImplementation } from '@hapi/boom';

function validate(data: Object, schema: Schema) {
  const { error } = schema.validate(data);
  return error;
}

export function validationHandler(schema: Schema, check: string = 'body') {
  return function (req: any, res: Response, next: NextFunction): void {
    const error = validate(req[check], schema);
    return error ? next(badImplementation()) : next();
  };
}
