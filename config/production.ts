export = {
  store: {
    postgres: {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [
         "dist/src/entities/**/*.ts"
      ],
      migrations: [
         "dist/src/migration/**/*.ts"
      ],
      subscribers: [
         "dist/src/subscriber/**/*.ts"
      ]
    }
  }
};

