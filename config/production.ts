export = {
  store: {
    postgres: {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [
         "src/entities/**/*.ts"
      ],
      migrations: [
         "src/migration/**/*.ts"
      ],
      subscribers: [
         "src/subscriber/**/*.ts"
      ]
    }
  }
};

