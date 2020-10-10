import { RequestHandler } from 'express';
import { controllers } from './';
import { asyncWrapper } from '../utils/async_wrapper';
import { createEvent } from '../services/daily_room_data';

const room: RequestHandler = async (_req, res) => {
  await createEvent();
  res.end();
};

export const batch: controllers = {
  'batch#room': asyncWrapper(room),
};
