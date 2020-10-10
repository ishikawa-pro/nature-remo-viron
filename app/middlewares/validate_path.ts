import { RequestHandler } from 'express';

export const validatePath: RequestHandler = (req, _res, next) => {
  const pathObj = req.swagger.api.paths[req.path];
  if (!pathObj) {
    next({ status: 404, message: 'Not Found' });
    return;
  }
  if (!pathObj[req.method.toLowerCase()]) {
    next({ status: 404, message: 'Not Found' });
    return;
  }
  next();
};
