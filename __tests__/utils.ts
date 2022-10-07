import { getConnection } from "typeorm";

const tableNames = ["Categoria", "Produto", "Promocao", "Restaurante"]

export const clearTables = async () => {

  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
}