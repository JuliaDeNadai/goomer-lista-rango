//import { AppDataSource } from "../../ormconfig";

export const createTypeormConn = async () => {

  /* AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
      console.error("Error during Data Source initialization", err)
  }) */
  /* return createConnection(
    Object.assign(
      connectionOptions, 
      {
        database: process.env.NODE_ENV?.trim() == 'test' ? "goomer_test" : connectionOptions.database,
        name: "default",
      }
    )
  ) */
};