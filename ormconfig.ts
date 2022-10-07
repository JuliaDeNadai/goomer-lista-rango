import { DataSource } from "typeorm";

require("dotenv-safe").config({
    path: process.env.NODE_ENV?.trim() === "test".trim() 
      ? ".env.test" 
      : ".env",
    allowEmptyValues: true
  });

const dotenv = require("dotenv")

dotenv.config({ path: __dirname + process.env.NODE_ENV?.trim() === "test".trim() ? ".env.test" : ".env" });

  const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    synchronize: false,
    dropSchema: false,
    entities: ['api/models/index.ts'],
    migrations: ['api/database/migrations/index.ts'],
  });

  AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized! Connected to ${process.env.DB_DATABASE} database 😎`)
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })

  export {AppDataSource}