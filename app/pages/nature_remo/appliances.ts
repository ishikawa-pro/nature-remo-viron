import {
  createPage,
  defaultSection,
  TableComponent,
  createAPI,
  Method,
} from 'viron-page-definer';

const applianceTable = new TableComponent(
  createAPI(Method.Get, '/nature-remo/appliances'),
  'appliances',
  undefined,
  undefined,
  undefined,
  undefined,
  'id',
  ['id', 'name', 'nickname', 'type']
);

export const appliances = createPage(
  'appliances',
  '家電',
  [applianceTable],
  defaultSection.manage,
  'natureRemo'
);
