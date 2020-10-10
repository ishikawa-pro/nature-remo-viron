import { RequestHandler } from 'express';
import { controllers } from './';
import { context } from '../context';
import * as swaggerObj from '../swagger/swagger.json';

const show: RequestHandler = (_req, res) => {
  const vironConfig = context.config('viron');
  swaggerObj.default.host = vironConfig.host;
  swaggerObj.default.schemes = vironConfig.schemes;
  res.json(swaggerObj);
};

export const swagger: controllers = {
  'swagger#show': show,
};
