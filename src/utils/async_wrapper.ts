import { RequestHandler, Request, Response, NextFunction } from 'express';

export const asyncWrapper = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<RequestHandler>
) => {
  const handler: RequestHandler = (req, res, next) => {
    return fn(req, res, next).catch((e) => next(e));
  };
  return handler;
};
