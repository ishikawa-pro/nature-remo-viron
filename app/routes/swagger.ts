import { RequestHandler } from 'express';
import { controllers } from './';
import * as swaggerObj from '../swagger/swagger.json';

const show: RequestHandler = (_req, res) => {
  res.json(swaggerObj);
};

export const swagger: controllers = {
  'swagger#show': show,
};
