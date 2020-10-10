import 'reflect-metadata';
import express, { ErrorRequestHandler } from 'express';
import createMiddleware, { SwaggerObject } from 'swagger-express-middleware';
import { Credentials } from 'google-auth-library';
import swaggerObj from './swagger/swagger.json';
import { assignController } from './utils/swagger';
import * as controllers from './routes';
import { useMiddlewares } from './middlewares';
import { context } from './context';

/* eslint @typescript-eslint/no-namespace: 0 */
declare global {
  namespace Express {
    interface Request {
      swagger: { api: SwaggerObject };
      auth:
        | {
            exp: number;
            iat: number;
            nbf: number;
            iss: string;
            aud: string;
            sub: string;
            googleOAuthToken: Credentials;
          }
        | undefined;
    }
    // interface Response {
    //   // 拡張される何かのパラメーター
    //   exparam: { some: string }
    // }
  }
}

(async () => {
  await context.init();

  const app = express();

  createMiddleware(swaggerObj as SwaggerObject, app, (err, middleware) => {
    if (err instanceof Error) throw err;
    app.use(middleware.metadata());

    useMiddlewares(app);

    assignController(app, controllers, swaggerObj);

    app.get('/ping', (_req, res) => {
      res.send('pong');
    });

    // Error handler to display the validation error as HTML
    const errorhandler: ErrorRequestHandler = (err, _req, res) => {
      res.status(err.status);
      res.send(
        '<h1>' + err.status + ' Error</h1>' + '<pre>' + err.message + '</pre>'
      );
    };
    app.use(errorhandler);
  });

  app.listen(process.env.PORT ?? 3000);
})();
