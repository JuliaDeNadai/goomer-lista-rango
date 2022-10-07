
import { req } from "../service"
import { product } from "../src/product";
import { clearTables } from "../utils";

beforeAll(async () => {
  await clearTables()
})

describe('CREATE PRODUCT', () => {


  it('Should return status 201 on created', async () => {
    let result = await req.post('/products').send({
      ...product, 
      restaurante: 1,
      categoria: 1 
    })

    expect(result.status).toEqual(201);

  })

  it('Should reject with error 400 on empty body', async () => {
    let result = await req.post('/products').send()

    expect(result.status).toEqual(400);

    expect((JSON.parse(result.error.text)).detail).toBe('Dados incompletos')
  })

  it('Should reject with error 404 on category not found', async () => {
    let result = await req.post('/products').send({
      ...product, 
      restaurante: 1,
      categoria: 3423 
    })

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Categoria não encontrada')
  })

  it('Should reject with error 404 on restaurant not found', async () => {
    let result = await req.post('/products').send({
      ...product, 
      restaurante: 1234,
      categoria: 3423 
    })

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Restaurante não encontrado')
  })

  it('Should reject with error 409 on duplicated product', async () => {

    let newProduct = product
    let entry = await req.post('/products').send({
      ...newProduct, 
      restaurante: 1,
      categoria: 3
    })

    let result = await req.post('/products').send({newProduct})

    expect(result.status).toEqual(409);

    expect((JSON.parse(result.error.text)).detail).toBe('Produto já existe')
  })

})

describe('DELETE PRODUCT', () => {
  it('Should return 200 on success', async () => {

  })

  it('Should reject with error 404 on product not found', async () => {
    let result = await req.delete('/products/'+ 1234)

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Produto não encontrado')
  })
})