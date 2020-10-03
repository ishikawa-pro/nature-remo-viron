import { google } from 'googleapis';
import axios from 'axios';
import { GenerateAuthUrlOpts, Credentials } from 'google-auth-library';
import { GOOGLE_OAUTH_SCOPES, GOOGLE_OAUTH_USER_INFO_URL } from '../constant';

export interface clientOption {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

export const getClient = (options: clientOption) => {
  return new google.auth.OAuth2(
    options.clientId,
    options.clientSecret,
    options.redirectUrl
  );
};

export const getToken = (code: string, options: clientOption) => {
  const client = getClient(options);
  return client.getToken(code);
};

export const getMailAddress = async (token: Credentials) => {
  const url = GOOGLE_OAUTH_USER_INFO_URL;
  const res = await axios.get(url, {
    headers: {
      Authorization: `OAuth ${token.access_token}`,
    },
  });
  return res.data.email;
};

export const genAuthUrl = (options: clientOption, stateUrl?: string) => {
  const client = getClient(options);
  const opts: GenerateAuthUrlOpts = {
    access_type: 'offline',
    scope: GOOGLE_OAUTH_SCOPES,
    state: stateUrl,
  };
  opts.prompt = 'consent';
  return client.generateAuthUrl(opts);
};
