import { RequestHandler } from 'express';
import { controllers } from './';
import * as helperGoogle from '../utils/google';
import * as helperJwt from '../utils/jwt';
import { asyncWrapper } from '../utils/async_wrapper';

const googlesignin: RequestHandler = (req, res) => {
  // Googleの認証画面にリダイレクト
  const redirectUrl =
    typeof req.query.redirect_url === 'string'
      ? req.query.redirect_url
      : req.get('referer');
  const authUrl = helperGoogle.genAuthUrl(redirectUrl);
  return res.redirect(authUrl); // 301
};

const googleoauth2callback: RequestHandler = async (req, res) => {
  const code = req.query.code as string;
  const { tokens } = await helperGoogle.getToken(code);
  const email = await helperGoogle.getMailAddress(tokens);
  // JWTを生成
  const claims = {
    sub: email,
    googleOAuthToken: tokens,
  };
  const jwt = await helperJwt.sign(claims);
  const redirectUrl = req.query.state as string;
  const authToken = `Bearer ${jwt}`;
  res.setHeader('Authorization', authToken);
  return res.redirect(`${redirectUrl}?token=${authToken}`);
};

export const viron_auth: controllers = {
  'viron_auth#googlesignin': googlesignin,
  'viron_auth#googleoauth2callback': asyncWrapper(googleoauth2callback),
};
