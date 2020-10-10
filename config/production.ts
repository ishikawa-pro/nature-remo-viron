export = {
  store: {
    postgres: {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [
         "dist/src/entities/**/*.js"
      ],
      migrations: [
         "dist/src/migration/**/*.js"
      ],
      subscribers: [
         "dist/src/subscriber/**/*.js"
      ]
    }
  }
};

