import {Request, Response} from 'express'

import { BadRequestError, ConflictError, NotFoundError } from '../utils/internalErrors'
import { CategoryRepository } from '../repositories/CategoryRepository';
import { AppDataSource } from '../../ormconfig';

enum MESSAGE {
  BAD_REQUEST = 'Dados incompletos',
  CONFLICT_NAME = 'Categoria já existe',
  NOT_FOUND = 'Categoria não encontrada'
}

class CategoryController {

  /* 
    REGRAS DE NEGÓCIO: 

     - Não é permitido que 2 categorias com mesmo nome sejam cadastradas
  */
  async create( request: Request, response: Response ){
    const {category} = request.body

    if(Object.keys(category).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    const categoryRepo = new CategoryRepository()

    let createCategory = await categoryRepo.save(category.nome) 

    return response.status(201).json({ id: createCategory.insertId, ...category})
  }

  async get_category(request: Request, response: Response){
    let { id } = request.params

    const categoryRepo = new CategoryRepository()

    let findCategory = await categoryRepo.getById(id) 

    if(findCategory.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.status(200).json(findCategory[0])
  }

}

export { CategoryController }