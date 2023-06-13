import { DataService } from "../services/DataService";
import { BadRequestError } from "../utils/internalErrors";


enum MESSAGE {
    BAD_REQUEST = 'Dados incompletos'
}

class ProductRepository {
    dataService: DataService
    
    /* ProductRepository(){
        this.dataService = new DataService()
    } */

    async save(product: {nome: string, categoria: number, preco: Float32Array, restaurante: number}){

        /* TODO: banco ta permitindo inserir mesmo tendo mesmo nome e restaurante */
        const ds = new DataService()
        return ds.execute(`
            INSERT INTO Produto (nome, idCategoria, preco, idRestaurante)
            VALUES ("${product.nome}", ${product.categoria}, ${product.preco}, ${product.restaurante})
        `)
    }

    async delete(id: number){

        const ds = new DataService()
        return ds.execute(`DELETE FROM Produto WHERE id= ${id}`)
    }

    async update(product: { nome: string, categoria: number, preco: Float32Array, restaurante: number }, id: string){
        const ds = new DataService()

        let updateString = ''

        if(Object.keys(product).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)
    
        if(product.nome) updateString.concat(`nome = "${product.nome}"`)
      
        if(product.restaurante) updateString.concat(`idRestaurante = "${product.restaurante}"`)
    
        if(product.categoria) updateString.concat(`idCategoria = "${product.categoria}"`)

        return ds.execute(
            `UPDATE Restaurante 
              SET nome = "${product.nome}",
                  preco = ${product.preco},
                  idCategoria = ${product.categoria},
                  idRestaurante = ${product.restaurante}
              WHERE id = ${id}`
          )
    }

    async getProductById(id: number){
        const ds = new DataService()
        return ds.execute(`SELECT * FROM Produto WHERE id = ${id}`)
    }


    async getAll(){
        const ds = new DataService()
        return ds.execute(`SELECT * FROM Produto`)
    }

    async getByRestaurant(id: number){
        const ds = new DataService()
        return ds.execute(`SELECT * FROM Produto WHERE idRestaurante = ${id}`)
    }


}

export {ProductRepository}