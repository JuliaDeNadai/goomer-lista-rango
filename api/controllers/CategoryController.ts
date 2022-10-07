import {Request, Response} from 'express'
import { AppDataSource } from '../../ormconfig'
import { BadRequestError, ConflictError, NotFoundError } from '../utils/internalErrors'

enum MESSAGE {
  BAD_REQUEST = 'Dados incompletos',
  CONFLICT_NAME = 'Categoria já existe',
  NOT_FOUND = 'Categoria não encontrada'
}

class CategoryController {

  async create(request: Request, response: Response){
    let category = request.body

    if(Object.keys(category).length === 0 ) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    let findCategory = await AppDataSource.query(
      `SELECT * FROM Categoria WHERE nome = "${category.nome}"`
    )

    if(findCategory.length > 0) throw new ConflictError(MESSAGE.CONFLICT_NAME)
    
    let result = await AppDataSource.query(
      `INSERT INTO Categoria (nome) VALUES ("${category.nome}")`
    )

    console.log(result)

    return response.status(201).json({ id: result.insertId, ...category})
  }

  async get_category(request: Request, response: Response){
    let {id} = request.params

    let findCategory = await AppDataSource.query(
      `SELECT * FROM Categoria WHERE id = ${id}`
    )

    if(findCategory.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.status(200).json(findCategory[0])
  }

}

export {CategoryController}