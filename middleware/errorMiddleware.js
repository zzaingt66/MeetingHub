import { ZodError } from 'zod';

export const errorMiddleware  = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Datos inválidos';
    errors = err.errors.map((error) => ({
      path: error.path.join('.'),
      message: error.message,
    }));
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Datos inválidos';
    errors = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
    }));
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Environment-specific error handling
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({ message, errors, stack: err.stack });
  } else {
    res.status(statusCode).json({ message, errors });
  }

  console.error(err);
};