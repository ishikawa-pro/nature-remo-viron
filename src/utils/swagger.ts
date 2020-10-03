import { Express, RequestHandler } from 'express';
import { SwaggerPathComponent, Swagger } from '../../swagger/swagger.json';
import { controllers } from '../routes';

type Components = {
  get: SwaggerPathComponent | null;
  post: SwaggerPathComponent | null;
  put: SwaggerPathComponent | null;
  delete: SwaggerPathComponent | null;
};

const _getComponent = (cmp: Components) =>
  cmp.delete ?? cmp.get ?? cmp.post ?? cmp.put;

const _getRequestHandler = (
  components: Components,
  controllers: { [k: string]: controllers }
): RequestHandler => {
  const cmp = _getComponent(components);
  if (cmp == null) {
    console.log('cannot find swagger path component');
    return (_req, res) => res.send('ok');
  }
  // コントローラーが用意されてない場合とりあえず適当なRequestHandlerを返す
  if (
    controllers[cmp['x-swagger-router-controller']] == null ||
    controllers[cmp['x-swagger-router-controller']][cmp.operationId] == null
  ) {
    console.log(
      'no implemented. controller: %s, operationId: %s',
      cmp['x-swagger-router-controller'],
      cmp.operationId
    );
    return (_req, res) => res.send('ok');
  }
  return controllers[cmp['x-swagger-router-controller']][cmp.operationId];
};

export const assignController = (
  app: Express,
  controllers: { [k: string]: controllers },
  swaggerObj: Swagger
) => {
  const map = new Map<
    string,
    { [m in 'get' | 'post' | 'put' | 'delete']: SwaggerPathComponent | null }
  >();
  for (const p in swaggerObj.paths) {
    map.set(p, swaggerObj.paths[p]);
  }

  for (const [p, v] of map.entries()) {
    v.get ? app.get(p, _getRequestHandler(v, controllers)) : null;
    v.post ? app.post(p, _getRequestHandler(v, controllers)) : null;
    v.put ? app.post(p, _getRequestHandler(v, controllers)) : null;
    v.delete ? app.delete(p, _getRequestHandler(v, controllers)) : null;
    const cmp = _getComponent(v);
    app.options(p, (_req, res) => {
      res.end();
    });

    console.log(
      'assign %s controller: %s, operationId: %s',
      p,
      cmp?.['x-swagger-router-controller'],
      cmp?.operationId
    );
  }
};
