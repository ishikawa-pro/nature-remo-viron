export = {
  viron: {
    host: 'localhost:3000',
    schemes: ['http']
  },
  store: {
    postgres: {
      type: "postgres",
      url: process.env.DATABASE_URL,
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
