import { RequestHandler } from 'express';
import { controllers } from './';
import { asyncWrapper } from '../utils/async_wrapper';
import { context } from '../context';

const show: RequestHandler = async (_req, res) => {
  const devices = await context.natureRemo._1devicesGet();
  res.json(devices.body);
};

export const devices: controllers = {
  'devices#show': asyncWrapper(show),
};
