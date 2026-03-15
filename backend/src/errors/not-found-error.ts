import HttpError from './http-error';

export default class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(404, message);
  }
}
