import {Request, Response} from 'express'
import { AppDataSource } from '../../ormconfig'
import { Restaurant } from '../models/Restaurant'
import { BadRequestError, ConflictError, NotFoundError } from '../utils/internalErrors'
import { ProductRepository } from '../repositories/ProductRepository'
import { SaleRepository } from '../repositories/SaleRepository'

enum MESSAGE {
  BAD_REQUEST = 'Dados incompletos',
  CONFLICT_NAME = 'Produto com mesmo nome já existe',
  NOT_FOUND = 'Produto não encontrado',
  NOT_FOUND_CATEGORY = 'Categoria não encontrada',
  NOT_FOUND_RESTAURANT = 'Restaurante não encontrado'
}

class ProductController{

  /* 
    REGRAS DE NEGÓCIO: 
     - Não é permitido que 2 produtos com mesmo nome sejam cadastrados no mesmo restaurante
  */
  async create(request: Request, response: Response){

    let product = request.body

    if(Object.keys(product).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    const productRepo = new ProductRepository()

    let result = await productRepo.save(product)

    return response.status(201).json({id: result.insertId, ...product})
  }

  /* 
    REGRAS DE NEGÓCIO: 
     - Caso o produto consultado esteja em promoção, também é retornado seu preço promocional
  */
  async get_product(request: Request, response: Response){
    let {id} = request.params

    const saleRepo = new SaleRepository()
    let findSalePrice = await saleRepo.getSaleByProductId(Number(id)) 

    if(findSalePrice.length > 0) return response.status(200).json(findSalePrice)

    const productRepo = new ProductRepository()
    let findProduct = await productRepo.getProductById(Number(id)) 

    if(findProduct.length === 0) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.status(200).json(findProduct)

  }

  async update (request: Request, response: Response){
    let {id} = request.params
    let product = request.body

    if(product.keys > 0){

      const productRepo = new ProductRepository()

      let updateRestaurant = await productRepo.update(product, id) 

      return response.sendStatus(200).json(updateRestaurant)
    }
    else throw new BadRequestError(MESSAGE.BAD_REQUEST)
  }

  async delete(request: Request, response: Response){
    let {id} = request.params

    const productRepo = new ProductRepository()

    let deleteProduct = await productRepo.delete(Number(id))

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

    const productRepo = new ProductRepository()
    
    let findProducts = await productRepo.getAll()

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
    
    const productRepo = new ProductRepository()

    let findProducts = await productRepo.getByRestaurant(Number(id))
    
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