import {Request, Response} from 'express'
import { AppDataSource } from '../../ormconfig'
import { Restaurant } from '../models/Restaurant'
import { BadRequestError, ConflictError, NotFoundError } from '../utils/internalErrors'

enum MESSAGE {
  BAD_REQUEST = 'Dados incompletos',
  CONFLICT_NAME = 'Produto com mesmo nome já existe',
  NOT_FOUND = 'Produto não encontrado',
  NOT_FOUND_CATEGORY = 'Categoria não encontrada',
  NOT_FOUND_RESTAURANT = 'Restaurante não encontrado'
}

class ProductController{

  async create(request: Request, response: Response){
    let product = request.body

    if(Object.keys(product).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    let duplicatedProduct = await AppDataSource.query(`
      SELECT * FROM Produto WHERE nome = "${product.nome}" AND idRestaurante = ${product.restaurante}
    `)

    if(duplicatedProduct.length > 0) throw new ConflictError(MESSAGE.CONFLICT_NAME)

    let findRestaurant = await AppDataSource.query(`SELECT * FROM Restaurante WHERE id = ${product.restaurante}`)

    if(findRestaurant.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND_RESTAURANT)

    let findCategory = await AppDataSource.query(`SELECT * FROM Categoria WHERE id = ${product.categoria}`)

    if(findCategory.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND_CATEGORY)

    let result = await AppDataSource.query(`
      INSERT INTO Produto (nome, idCategoria, preco, idRestaurante)
       VALUES ("${product.nome}", ${product.categoria}, ${product.preco}, ${product.restaurante})
    `)

    return response.status(201).json({id: result.insertId, ...product})
  }

  async get_product(request: Request, response: Response){
    let {id} = request.params

    let findSalePrice = await AppDataSource.query(`
      SELECT *
      FROM goomer.produto p
      RIGHT JOIN goomer.promocao pr ON pr.idProduto = p.id
      WHERE p.id = ${id} 
        AND pr.ativa = 'Y' 
        AND current_time BETWEEN pr.inicio AND pr.encerramento 
        and pr.dia_semana = DAYOFWEEK(current_date())
    `)

    if(findSalePrice.length > 0) return response.status(200).json(findSalePrice)

    let findProduct = await AppDataSource.query(`SELECT * FROM Produto WHERE id = ${id}`)

    if(findProduct.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.status(200).json(findProduct)

  }

  async update (request: Request, response: Response){
    let {id} = request.params
    let product = request.body

    let updateString = ''

    if(Object.keys(product).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    let findProduct = await AppDataSource.query(`
      SELECT * FROM Produto WHERE id = ${id}
    `)

    if(findProduct.length === 0 ) throw new NotFoundError(MESSAGE.NOT_FOUND)

    if(product.nome){

      let duplicatedProduct = await AppDataSource.query(`
        SELECT * FROM Produto WHERE nome = "${product.nome}" AND id != ${id} AND idRestaurante = ${findProduct.idRestaurante}
      `)
  
      if(duplicatedProduct.length > 0) throw new ConflictError(MESSAGE.CONFLICT_NAME)

      updateString.concat(`nome = "${product.nome}"`)
    }

    if(product.restaurante){
      let findRestaurant = await AppDataSource.query(`SELECT * FROM Restaurante WHERE id = ${product.restaurante}`)
  
      if(findRestaurant.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND_RESTAURANT)

      updateString.concat(`idRestaurante = "${product.restaurante}"`)

    }

    if(product.categoria){
      let findCategory = await AppDataSource.query(`SELECT * FROM Categoria WHERE id = ${product.categoria}`)
  
      if(findCategory.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND_CATEGORY)

      updateString.concat(`idCategoria = "${product.categoria}"`)
    }

    if(updateString.length > 0){

      let updateRestaurant = await AppDataSource.query(
        `UPDATE Restaurante 
          SET nome = "${product.nome}",
              preco = ${product.preco},
              idCategoria = ${product.categoria},
              idRestaurante = ${product.restaurante}
          WHERE id = ${id}`
      )

      return response.sendStatus(200)
    }
    else throw new BadRequestError(MESSAGE.BAD_REQUEST)
  }

  async delete(request: Request, response: Response){
    let {id} = request.params

    let deleteProduct = await AppDataSource.query(`DELETE FROM Produto WHERE id= ${id}`)

    if(deleteProduct.affectedRows === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.sendStatus(200)
  }

  async get_products(request: Request, response: Response){
    let {query} = request
    let { perPage, page, ...q } = request.query;
    let realPage: number;
    let realTake: number;

    if (perPage) realTake = +perPage;
    else {
      perPage = '10';
      realTake = 10;
    }

    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
      realPage = 0;
      page = '1';
    }
    
    let findProducts = await AppDataSource.query(`SELECT * FROM Produto`)

    const getQuery = () => Object.keys(q).map((key) => `${key}=${q[key]}`).join('&');

    const qp: string = getQuery().length === 0 ? '' : `&${getQuery()}`;

    const data: any = {
      records: findProducts,
      perPage: realTake,
      page: +page || 1,
      pageCount: (findProducts.length > realTake
        ? (findProducts.length % realTake) > 0
          ? Math.floor(findProducts.length / realTake) + 1 
          : Math.floor(findProducts.length / realTake) 
        : 1),
      recordCount: findProducts.length,
      next: `http://localhost:3308/products?perPage=${realTake}&page=${
        +page + 1
      }${qp}`,
      prev: `http://localhost:3308/products?perPage=${realTake}&page=${
        +page - 1
      }${qp}`,
    }

    if((+page - 1) == 0)  delete data.prev;
    if((data.pageCount < (+data.page + 1))) delete data.next;

    return response.status(200).json(data)
  }

  async get_by_restaurant(request: Request, response: Response){
    let {id} = request.params
    let {query} = request
    let { perPage, page, ...q } = request.query;
    let realPage: number;
    let realTake: number;

    if (perPage) realTake = +perPage;
    else {
      perPage = '10';
      realTake = 10;
    }

    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
      realPage = 0;
      page = '1';
    }
    
    let findProducts = await AppDataSource.query(`SELECT * FROM Produto WHERE idRestaurante = ${id}`)
    
    const getQuery = () => Object.keys(q).map((key) => `${key}=${q[key]}`).join('&');

    const qp: string = getQuery().length === 0 ? '' : `&${getQuery()}`;

    const data: any = {
      records: findProducts,
      perPage: realTake,
      page: +page || 1,
      pageCount: (findProducts.length > realTake
        ? (findProducts.length % realTake) > 0
          ? Math.floor(findProducts.length / realTake) + 1 
          : Math.floor(findProducts.length / realTake) 
        : 1),
      recordCount: findProducts.length,
      next: `http://localhost:3308/products?perPage=${realTake}&page=${
        +page + 1
      }${qp}`,
      prev: `http://localhost:3308/products?perPage=${realTake}&page=${
        +page - 1
      }${qp}`,
    }

    if((+page - 1) == 0)  delete data.prev;
    if((data.pageCount < (+data.page + 1))) delete data.next;

    return response.status(200).json(data)
  }

}

export {ProductController}