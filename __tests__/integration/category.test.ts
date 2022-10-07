import { getConnection } from "typeorm";
import { Category } from "../../api/models/Category";
import { req } from "../service";
import { category } from "../src/category";
import { clearTables } from "../utils";

beforeAll(async () => {

  await clearTables()
})

describe('CREATE CATEGORY', () => {
  it('Should return 201 on created', async () => {
    let result = await req.post('/categories').send(category)

    expect(result.status).toEqual(201);

    // TODO: verificar se realmente foi inserido
  })

  it('Should reject with error 400 on empty body', async () => {
    let result = await req.post('/categories').send()

    expect(result.status).toEqual(400);

    expect((JSON.parse(result.error.text)).detail).toBe('Dados incompletos')
  })

  it('Should reject with error 409 on duplicated category', async () => {
    let entry = await req.post('/categories').send(category)

    let result = await req.post('/categories').send(entry.data)

    expect(result.status).toEqual(409);

    expect((JSON.parse(result.error.text)).detail).toBe('Categoria já existe')
  })
})

describe('GET CATEGORY', () => {

  it('Should return 200 on sucess', async () => {
    let entry = await req.post('/categories').send(category)

    let result = await req.get('/categories/'+ entry.data.id )

    expect(result.status).toEqual(200);
  })

  it('Should reject with error 404 on category not found', async () => {
    let result = await req.get('/categories/'+ 56876 )

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Categoria não encontrada')
  })
})