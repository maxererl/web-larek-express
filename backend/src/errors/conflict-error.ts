import HttpError from './http-error';

export default class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}
