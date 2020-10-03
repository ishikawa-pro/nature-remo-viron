declare module "*/config/local" {

  interface AuthJwt {
    token_expire: number;
    algorithm: string;
    claims: {
      iss: string,
      aud: string,
    },
    rsa_private_key: string,
    rsa_public_key: string,
  }
  interface Config {
    authJwt: AuthJwt
  }
  const value: Config;
  export default value;
}
