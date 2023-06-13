import { DataService } from "../services/DataService";
import { NotFoundError } from "../utils/internalErrors";

enum MESSAGE {
  NOT_FOUND = 'Restaurante não encontrado'
}

class RestaurantRepository {
    dataService: DataService

    async save( restaurant: {nome: string, endereco: string, abertura: string, encerramento: string}){
      const ds = new DataService()
      return ds.execute(`
        INSERT INTO Restaurante (nome, endereco, abertura, encerramento) 
        VALUES ("${restaurant.nome}", "${restaurant.endereco}", "${restaurant.abertura}", "${restaurant.encerramento}")`
      )
    }

    async update( restaurant: {id: number, nome: string, endereco: string, abertura: string, encerramento: string}){
      const ds = new DataService()
      return ds.execute(`
        UPDATE Restaurante 
        SET nome = "${restaurant.nome}", 
            endereco = "${restaurant.endereco}", 
            abertura = "${restaurant.abertura}",
            encerramento = "${restaurant.encerramento}"
        WHERE id = ${restaurant.id}`)
    }

    async getAll(){
      const ds = new DataService()
      return await ds.execute(`
        SELECT 
          r.id,
          r.nome,
          r.endereco,
          /*r.foto*/
          DATE_FORMAT(r.abertura, '%H:%i') as abertura, 
          DATE_FORMAT(r.encerramento, '%H:%i') as encerramento 
        FROM Restaurante r
      `)
    }

    async getById(id: number){
      const ds = new DataService()
      return ds.execute(`SELECT * FROM Produto WHERE id = ${id}`)
    }

    async delete(id: string){
      const ds = new DataService()
      let result = await ds.execute(`DELETE FROM Restaurante WHERE id = ${id}`)

      if(result.affectedRows === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)
    }


}

export { RestaurantRepository };
