import { createMenu, theme, EndpointColor } from 'viron-page-definer';
import { appliances, devices } from './nature_remo';
import { room } from './surveillance';

export const pages = createMenu(
  'nature-remo-dashboard',
  [room, appliances, devices],
  undefined,
  ['viron'],
  theme.standard,
  EndpointColor.blue,
  undefined
);
