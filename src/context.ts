import {
  Connection,
  createConnection,
  EntityTarget,
  Repository,
} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DefaultApi } from 'nature-remo-api-client-ts';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
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

interface NatureRemoConfig {
  accessToken: string;
}

interface Config {
  authJwt: AuthJwt;
  auth: {
    allowedDomain: string;
    adminUser: string;
  };
  googleOauth: GoogleOauth;
  natureRemo: NatureRemoConfig;
  store: {
    postgres: PostgresConnectionOptions;
  };
}

class Context {
  natureRemo: DefaultApi;
  googleApi: OAuth2Client;
  typeOrmConn!: Connection;

  constructor() {
    this.natureRemo = this.initNatureRemoApi();
    this.googleApi = this.initGoogleApi(this.confg('googleOauth'));
  }

  confg<T extends keyof Config>(key: T): Config[T] {
    return config.get(key);
  }

  async init() {
    await this.initTypeOrm();
  }

  initGoogleApi(options: GoogleOauth) {
    const client = new google.auth.OAuth2(
      options.clientId,
      options.clientSecret,
      options.redirectUrl
    );
    return client;
  }

  initNatureRemoApi() {
    const client = new DefaultApi();
    client.accessToken = this.confg('natureRemo').accessToken;
    return client;
  }

  async initTypeOrm() {
    this.typeOrmConn = await createConnection(this.confg('store').postgres);
  }

  getDBRrepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.typeOrmConn.getRepository(target);
  }
}

export const context = new Context();
