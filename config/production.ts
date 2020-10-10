export = {
  store: {
    postgres: {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [
         "dist/app/entities/**/*.js"
      ],
      migrations: [
         "dist/app/migration/**/*.js"
      ],
      subscribers: [
         "dist/app/subscriber/**/*.js"
      ]
    }
  }
};

