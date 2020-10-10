import { RequestHandler } from 'express';
import { controllers } from './';
import { pages } from '../pages';

const show: RequestHandler = (_req, res) => {
  res.json(pages);
};

export const viron: controllers = {
  'viron#show': show,
};
