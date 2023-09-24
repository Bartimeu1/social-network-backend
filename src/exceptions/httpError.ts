import { ValidationError } from 'express-validator';

export class HttpError extends Error {
  statusCode: number;
  errors: ValidationError[];

  constructor(
    statusCode: number,
    message: string,
    errors: ValidationError[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static Unauthorized() {
    return new HttpError(401, 'User is not authorized');
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new HttpError(400, message, errors);
  }

  static UserExists(message: string) {
    return new HttpError(409, message);
  }
}
