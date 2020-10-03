import { RequestHandler } from 'express';
import { getMailAddress } from '../utils/google';
import { asyncWrapper } from '../utils/async_wrapper';
import { context } from '../context';

const handler: RequestHandler = async (req, _res, next) => {
  const auth = context.confg('auth');
  const pathObj = req.swagger.api.paths[req.path][req.method.toLowerCase()];
  if (pathObj.security == null) {
    next();
    return;
  }
  if (
    !pathObj.security.some(
      (schema: { [k: string]: [string] }) => !!schema['jwt']
    )
  ) {
    next();
    return;
  }
  if (!req.auth) {
    next({ status: 401, message: 'Unauthorized' });
    return;
  }
  const mail = await getMailAddress(req.auth.googleOAuthToken);
  const [user, domain] = mail.split('@');
  if (user !== auth.adminUser || domain !== auth.allowedDomain) {
    next({ status: 403, message: 'Forbidden' });
    return;
  }
  next();
};

export const google: RequestHandler = asyncWrapper(handler);
