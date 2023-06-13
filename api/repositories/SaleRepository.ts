import { DataService } from "../services/DataService"
import { NotFoundError } from "../utils/internalErrors";

const dia_semana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

enum MESSAGE {
  NOT_FOUND = 'Promoção não encontrada',
}

class SaleRepository {

    async getSaleByProductId(id: number){

        const ds = new DataService()
        return ds.execute(`
            SELECT *
            FROM goomer.produto p
            RIGHT JOIN goomer.promocao pr ON pr.idProduto = p.id
            WHERE p.id = ${id} 
            AND pr.ativa = 'Y' 
            AND current_time BETWEEN pr.inicio AND pr.encerramento 
            and pr.dia_semana = DAYOFWEEK(current_date())
        `)
    }

    async getSaleById(id: number){
        const ds = new DataService()
        let result = await ds.execute(`
            SELECT 
            r.descricao,
            r.dia_semana,
            DATE_FORMAT(r.inicio, '%H:%i') as inicio, 
            DATE_FORMAT(r.encerramento, '%H:%i') as encerramento 
            FROM Promocao r 
            WHERE r.id = ${id}
        `)

        if(result.length == 0) throw new NotFoundError(MESSAGE.NOT_FOUND)
        
        return result
    }

    async create(sale: {
                descricao: string, 
                preco: number, 
                dia_semana: string,
                inicio: Date,
                encerramento: Date,
                ativa: boolean,
                produto: number
            }){
        
        const ds = new DataService()
        let result = await ds.execute(`
            INSERT INTO Promocao 
                (descricao, preco, dia_semana, inicio, encerramento, ativa, idProduto)
            VALUES ("${sale.descricao}", "${sale.preco}", "${dia_semana.indexOf(sale.dia_semana) + 1}", "${sale.inicio}", "${sale.encerramento}", "Y", ${sale.produto})
            `)

        return result
    }
}

export { SaleRepository }