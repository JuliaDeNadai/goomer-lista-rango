import {Request, Response} from 'express'
import { AppDataSource } from '../../ormconfig'
import { BadRequestError, ConflictError, NotFoundError } from '../utils/internalErrors'

enum MESSAGE {
  BAD_REQUEST = 'Dados incompletos',
  BAD_REQUEST_INVALID_TIME = 'Horários inválidos. O encerramento deve ser maior que o horário de início e a diferença mínima deve ser de 15 minutos',
  CONFLICT = 'Promoção para o mesmo dia e horário já existe',
  NOT_FOUND = 'Promoção não encontrada',
  NOT_FOUND_PRODUCT = 'Produto não encontrada',
}

const dia_semana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

class SaleController{

  /* 
    REGRAS DE NEGÓCIO: 
     - Não é permitido que 2 promoções sejam criadas no mesmo dia e mesmo horário para um mesmo produto
     - O horário de inicio DEVE ser MENOR que o horário de encerramento
     - O tempo entre o horário de inicio e encerramento DEVE ser de no MÍNIMO 15 MINUTOS 
     - Os campos de horário devem estar no formato HH:mm
  */
  async create(request: Request, response: Response){
    let sale = request.body
    

    if(Object.keys(sale).length === 0) throw new BadRequestError(MESSAGE.BAD_REQUEST)

    var timeStart = new Date("01/01/2007 " + sale.inicio).getTime()
    var timeEnd = new Date("01/01/2007 " + sale.encerramento).getTime()

    var hourDiff = timeEnd - timeStart; 

    if(sale.inicio >= sale.encerramento || (hourDiff / 60000) <= 15){

      throw new BadRequestError(MESSAGE.BAD_REQUEST_INVALID_TIME)
    }
    let findProduct = await AppDataSource.query(`SELECT * FROM Produto WHERE id = ${sale.produto}`)

    if(findProduct.length === 0 ) throw new NotFoundError(MESSAGE.NOT_FOUND_PRODUCT)

    let findDuplicatedSale = await AppDataSource.query(`
      SELECT * FROM Promocao 
        WHERE dia_semana = "${dia_semana.indexOf(sale.dia_semana) + 1}"
        AND ativa = 'Y'
        AND inicio BETWEEN ('${sale.inicio}') AND ('${sale.encerramento}')
        AND encerramento BETWEEN ('${sale.inicio}') AND ('${sale.encerramento}')
        AND idProduto = ${sale.idProduto}
    `)

    if(findDuplicatedSale.length > 0 ) throw new ConflictError(MESSAGE.CONFLICT)

    let result = await AppDataSource.query(`
      INSERT INTO Promocao 
        (descricao, preco, dia_semana, inicio, encerramento, ativa, idProduto)
      VALUES ("${sale.descricao}", "${sale.preco}", "${dia_semana.indexOf(sale.dia_semana) + 1}", "${sale.inicio}", "${sale.encerramento}", "Y", ${sale.produto})
    `)

    return response.status(201).json({id: result.insertId, ...sale})

  }

  async get_sale(request: Request, response: Response){
    let {id} = request.params

    let findSale = await AppDataSource.query(`
      SELECT 
        r.descricao,
        r.dia_semana,
        DATE_FORMAT(r.inicio, '%H:%i') as inicio, 
        DATE_FORMAT(r.encerramento, '%H:%i') as encerramento 
      FROM Promocao r 
      WHERE r.id = ${id}
    `)

    if(findSale.length == 0 ) throw new NotFoundError(MESSAGE.NOT_FOUND)

    return response.status(200).json(findSale[0])

  }

  async get_sales_by_product(request: Request, response: Response){
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

    let findSales = await AppDataSource.query(`
      SELECT 
        r.id,
        r.descricao,
        r.dia_semana,
        DATE_FORMAT(r.inicio, '%H:%i') as inicio, 
        DATE_FORMAT(r.encerramento, '%H:%i') as encerramento 
      FROM Promocao r 
      WHERE r.idProduto = ${id}
    `)

    const getQuery = () => Object.keys(q).map((key) => `${key}=${q[key]}`).join('&');

    const qp: string = getQuery().length === 0 ? '' : `&${getQuery()}`;

    const data: any = {
      records: findSales,
      perPage: realTake,
      page: +page || 1,
      pageCount: (findSales.length > realTake
        ? (findSales.length % realTake) > 0
          ? Math.floor(findSales.length / realTake) + 1 
          : Math.floor(findSales.length / realTake) 
        : 1),
      recordCount: findSales.length,
      next: `http://localhost:3308/sales?perPage=${realTake}&page=${
        +page + 1
      }${qp}`,
      prev: `http://localhost:3308/sales?perPage=${realTake}&page=${
        +page - 1
      }${qp}`,
    }

    if((+page - 1) == 0)  delete data.prev;
    if((data.pageCount < (+data.page + 1))) delete data.next;

    return response.status(200).json(data)
  }


}

export {SaleController}