import {
  createPage,
  defaultSection,
  TableComponent,
  createAPI,
  Method,
} from 'viron-page-definer';

const deviceTable = new TableComponent(
  createAPI(Method.Get, '/nature-remo/devices'),
  'devices',
  undefined,
  undefined,
  undefined,
  undefined,
  'id',
  ['id', 'name', 'firmwareVersion']
);

export const devices = createPage(
  'devices',
  'デバイス',
  [deviceTable],
  defaultSection.manage,
  'natureRemo'
);
