export = {
  googleOauth: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRETS,
    redirectUrl: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URL,
  },
  authJwt: {
    token_expire: 1 * 24 * 60 * 60 * 1000, // 1日
    algorithm: 'RS512',
    claims: {
      iss: 'viron-example-google',
      aud: 'viron.local',
    },
    rsa_private_key: process.env.AUTH_JWT_PRIVATE_KEY!,
    rsa_public_key: process.env.AUTH_JWT_PUBLIC_KEY!,
  },
  auth: {
    allowedDomain: process.env.ALLOWED_DOMAIN,
    adminUser: process.env.ADMIN_USER
  }
};
