import { RequestHandler } from 'express';

export interface controllers {
  [k: string]: RequestHandler;
}

export * from './swagger';
export * from './viron_authtype';
export * from './viron';
export * from './viron_auth';
