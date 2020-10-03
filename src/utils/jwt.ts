import jwt from 'jsonwebtoken';
import { Credentials } from 'google-auth-library';
import { Buffer } from 'buffer';
import { context } from '../context';

/**
 * jwt claimsに署名し、トークンを取得する
 * @param claims {object} jwt claims
 * @param options {object}
 */
export const sign = (claims: {
  sub: string;
  googleOAuthToken: Credentials;
}) => {
  const authJwt = context.confg('authJwt');
  return jwt.sign(
    {
      exp: Math.floor(
        (Date.now() + (authJwt.token_expire || 24 * 60 * 60 * 1000)) / 1000
      ), // Tokenの有効期限
      iat: Math.floor(Date.now() / 1000), // Tokenを発行した日時
      nbf: 0, // Tokenが有効になる日時
      ...authJwt.claims,
      ...claims,
    },
    Buffer.from(authJwt.rsa_private_key),
    { algorithm: 'RS512' }
  );
};
