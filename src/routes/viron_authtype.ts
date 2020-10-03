import { RequestHandler } from 'express';
import { controllers } from './';

const list: RequestHandler = (_req, res) => {
  res.json([
    // GoogleOAuthによる認証
    {
      type: 'oauth',
      provider: 'google',
      url: '/googlesignin',
      method: 'POST',
    },
    // サインアウト時にコールするAPIを定義するため
    {
      type: 'signout',
      provider: '',
      url: '/signout',
      method: 'POST',
    },
  ]);
};

export const viron_authtype: controllers = {
  'auth_type#list': list,
};
