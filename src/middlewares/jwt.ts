import { Buffer } from 'buffer';
import { RequestHandler, Request } from 'express';
import jwt, { GetTokenCallback } from 'express-jwt';
import { context } from '../context';

const getToken = (): GetTokenCallback => {
  return (req: Request): any => {
    const jwtHeader = req.get('Authorization');
    if (jwtHeader) {
      const parts = jwtHeader.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          return credentials;
        }
      }
    }
  };
};

export const authJwt: RequestHandler = (req, res, next) => {
  const options = context.config('authJwt');

  jwt({
    secret: Buffer.from(options.rsa_public_key),
    credentialsRequired: false,
    requestProperty: 'auth',
    algorithms: [options.algorithm],
    getToken: getToken(),
  })(req, res, (err: any) => {
    if (err instanceof jwt.UnauthorizedError) {
      res.setHeader(
        'WWW-Authenticate',
        'Bearer token_type="JWT" realm="Authorization Required"'
      );
      return next({ status: 401, message: 'Unauthorized' });
    }
    if (err) {
      return next(err);
    }
    res.setHeader('Authorization', req.get('Authorization') || '');
    next();
  });
};
