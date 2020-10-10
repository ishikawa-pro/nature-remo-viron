import { Express } from 'express';
import { cors } from './cors';
import { validatePath } from './validate_path';
import { authJwt } from './jwt';
import { google } from './google';

export const useMiddlewares = (app: Express) => {
  app.use(cors);
  app.use(validatePath);
  app.use(authJwt);
  app.use(google);
};
