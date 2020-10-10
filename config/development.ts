export = {
  store: {
    postgres: {
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: false,
      entities: [
         "app/entities/**/*.ts"
      ],
      migrations: [
         "app/migration/**/*.ts"
      ],
      subscribers: [
         "app/subscriber/**/*.ts"
      ]
    }
  }
};
