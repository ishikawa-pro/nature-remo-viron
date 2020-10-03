import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

interface AuthJwt {
  token_expire: number;
  algorithm: string;
  claims: {
    iss: string;
    aud: string;
  };
  rsa_private_key: string;
  rsa_public_key: string;
}

interface GoogleOauth {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

interface Config {
  authJwt: AuthJwt;
  auth: {
    allowedDomain: string;
    adminUser: string;
  };
  googleOauth: GoogleOauth;
}

class Context {
  confg<T extends keyof Config>(key: T): Config[T] {
    return config.get(key);
  }

  async init() {
    return Promise.resolve();
  }
}

export const context = new Context();
