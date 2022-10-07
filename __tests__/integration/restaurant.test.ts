import { AppDataSource } from "../../ormconfig";
import { req } from "../service";



describe('CREATE RESTAURANT', () => {
  it('Should return status 201 on success', async() => {
    let result = await req.post('/restaurants').send({
      nome: "restaurante",
      endereco: "rua dos jogadores, 405, São Paulo",
      abertura: "09:00:00",
      encerramento: "17:00:00"
    })

    expect(result.status).toEqual(201);
  })

  it('Should reject with 400 on incomplete data', async () => {
    let result = await req.post('/restaurants').send()

    expect(result.status).toEqual(400);

    expect((JSON.parse(result.error.text)).detail).toBe('Dados incompletos')
  })

  it('Should reject with 409 on existent restaurant', async () => {
    let result = await req.post('/restaurants').send({
      nome: "restaurante",
      endereco: "rua dos jogadores, 405, São Paulo",
      abertura: "09:00:00",
      encerramento: "17:00:00"
    })

    expect(result.status).toEqual(409);

    expect((JSON.parse(result.error.text)).detail).toBe('Restaurante com mesmo nome já existe')
  })

})

describe('GET', () => {
  it('Should return 200 and requested restaurant on sucess', async () => {
    let result = await req.get('/restaurants/'+ 5)

    expect(result.status).toEqual(200);
  })

  it('Should reject with 404 on restaurant not found', async () => {
    let result = await req.get('/restaurants/'+ 99)

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Restaurante não encontrado')
  })
})

describe('DELETE RESTAURANT', () => {


  it('Should reject with error 404 on restaurant not found', async () => {
    let result = await req.delete('/restaurants/'+ 1234)

    expect(result.status).toEqual(404);

    expect((JSON.parse(result.error.text)).detail).toBe('Restaurante não encontrado')
  })
})