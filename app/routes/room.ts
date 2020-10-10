import { RequestHandler } from 'express';
import { controllers } from './';
import { asyncWrapper } from '../utils/async_wrapper';
import { context } from '../context';
import * as dailyRoomData from '../services/daily_room_data';

const _convertData = (
  v: {
    temperature?:
      | {
          val?: number | undefined;
          createdAt?: Date | undefined;
        }
      | undefined;
    humidity?:
      | {
          val?: number | undefined;
          createdAt?: Date | undefined;
        }
      | undefined;
    illumination?:
      | {
          val?: number | undefined;
          createdAt?: Date | undefined;
        }
      | undefined;
  }[],
  type: 'temperature' | 'humidity' | 'illumination'
) => {
  return v.map((v) => {
    return {
      dateTime: v[type]?.createdAt,
      value: v[type]?.val,
    };
  });
};

const temperature: RequestHandler = async (_req, res) => {
  const devices = await context.natureRemo._1devicesGet();
  res.json({ value: devices.body[0].newestEvents?.te?.val });
};

const humidity: RequestHandler = async (_req, res) => {
  const devices = await context.natureRemo._1devicesGet();
  res.json({ value: devices.body[0].newestEvents?.hu?.val });
};

const illumination: RequestHandler = async (_req, res) => {
  const devices = await context.natureRemo._1devicesGet();
  res.json({ value: devices.body[0].newestEvents?.il?.val });
};

const temperatureGraph: RequestHandler = async (_req, res) => {
  const roomData = await dailyRoomData.findByDate(new Date());
  res.json({
    x: 'dateTime',
    y: 'value',
    color: 'product',
    guide: {
      y: { label: '温度' },
      x: { label: '時間' },
    },
    data: _convertData(roomData?.data ?? [], 'temperature'),
  });
};

const humidityGraph: RequestHandler = async (_req, res) => {
  const roomData = await dailyRoomData.findByDate(new Date());
  res.json({
    x: 'dateTime',
    y: 'value',
    color: 'product',
    guide: {
      y: { label: '温度' },
      x: { label: '時間' },
    },
    data: _convertData(roomData?.data ?? [], 'humidity'),
  });
};

const illuminationGraph: RequestHandler = async (_req, res) => {
  const roomData = await dailyRoomData.findByDate(new Date());
  res.json({
    x: 'dateTime',
    y: 'value',
    color: 'product',
    guide: {
      y: { label: '温度' },
      x: { label: '時間' },
    },
    data: _convertData(roomData?.data ?? [], 'illumination'),
  });
};

export const room: controllers = {
  'room#temperature': asyncWrapper(temperature),
  'room#humidity': asyncWrapper(humidity),
  'room#illumination': asyncWrapper(illumination),
  'room#temperature-graph': asyncWrapper(temperatureGraph),
  'room#humidity-graph': asyncWrapper(humidityGraph),
  'room#illumination-graph': asyncWrapper(illuminationGraph),
};
