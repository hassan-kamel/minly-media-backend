import { StatusCodes } from './StatusCodes';

export default class AppError extends Error {
  statusCode: StatusCodes;
  status: string;
  error: unknown;
  constructor(message: string, statusCode: number, error: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.error = error;
  }
}
