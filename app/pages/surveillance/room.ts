import {
  createPage,
  defaultSection,
  NumberComponent,
  ChartComponent,
  ChartType,
  createAPI,
  Method,
} from 'viron-page-definer';

const temperatureNumber = new NumberComponent(
  createAPI(Method.Get, '/dashboard/room/temperature'),
  '温度',
  60 * 5,
  '度'
);

const humidityNumber = new NumberComponent(
  createAPI(Method.Get, '/dashboard/room/humidity'),
  '湿度',
  60 * 5,
  '度'
);

const illuminationNumber = new NumberComponent(
  createAPI(Method.Get, '/dashboard/room/illumination'),
  '照度',
  60 * 5,
  '度'
);

const temperatureGraph = new ChartComponent(
  createAPI(Method.Get, '/dashboard/room/temperature-graph'),
  '温度グラフ',
  ChartType.GraphLine,
  60 * 5
);

const humidityGraph = new ChartComponent(
  createAPI(Method.Get, '/dashboard/room/humidity-graph'),
  '湿度グラフ',
  ChartType.GraphLine,
  60 * 5
);

const illuminationGraph = new ChartComponent(
  createAPI(Method.Get, '/dashboard/room/illumination-graph'),
  '照度グラフ',
  ChartType.GraphLine,
  60 * 5
);

export const room = createPage(
  'room',
  '部屋',
  [
    temperatureNumber,
    humidityNumber,
    illuminationNumber,
    temperatureGraph,
    humidityGraph,
    illuminationGraph,
  ],
  defaultSection.dashboard,
  '監視'
);
