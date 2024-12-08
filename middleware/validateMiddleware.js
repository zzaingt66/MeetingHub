import { ZodError } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Datos inválidos", errors });
    }
    next(error);
  }
};

export const zodValidationMiddleware = (zodSchema) => {
  return function (next) {
    try {
      zodSchema.parse(this);
      next();
    } catch (error) {
      next(error);
    }
  };
};
