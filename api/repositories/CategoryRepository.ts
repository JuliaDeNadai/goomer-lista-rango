import { DataService } from "../services/DataService"
import { ConflictError, InternalError } from "../utils/internalErrors"

enum MESSAGE {
    BAD_REQUEST = 'Dados incompletos',
    CONFLICT_NAME = 'Categoria já existe',
    NOT_FOUND = 'Categoria não encontrada'
}

class CategoryRepository {

    dataService: DataService

    /* CategoryRepository(){

        this.dataService = new DataService()
    } */
    
    async get(nome: string){

        const ds = new DataService()

        return ds.execute(`SELECT * FROM Categoria WHERE nome = "${nome}"`)

    }

    async getById(id: string){

        const ds = new DataService()
        return ds.execute(`SELECT * FROM Categoria WHERE id = ${id}`)
    }

    async save(nome: string){

        const ds = new DataService()
        return ds.execute(`INSERT INTO Categoria (nome) VALUES ("${nome}")`)
    }
}

export {CategoryRepository}