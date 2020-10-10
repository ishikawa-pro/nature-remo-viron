import { RequestHandler } from 'express';
import { controllers } from './';
import { asyncWrapper } from '../utils/async_wrapper';
import { context } from '../context';

const show: RequestHandler = async (_req, res) => {
  const appliances = await context.natureRemo._1appliancesGet();
  res.json(
    appliances.body.map((v) => {
      return {
        id: v.id,
        name: v.model?.name,
        nickname: v.nickname,
        type: v.type,
      };
    })
  );
};

export const appliances: controllers = {
  'appliances#show': asyncWrapper(show),
};
