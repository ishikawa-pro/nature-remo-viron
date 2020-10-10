import { RequestHandler } from 'express';

export const cors: RequestHandler = (req, res, next) => {
  res.setHeader('access-control-allow-origin', 'https://cam-inc.github.io');
  res.setHeader(
    'access-control-allow-methods',
    'POST, PUT, DELETE, GET, OPTIONS'
  );
  res.setHeader('access-control-allow-headers', 'Content-Type, authorization');
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  next();
};
