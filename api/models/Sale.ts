import { Length, IsDate, IsDecimal, Max, Min } from "class-validator";
import Decimal from "decimal.js";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DecimalTransformer } from "../utils/decimal.transformer";
import { Product } from "./Product";

/* 
  Para tratar a questão dos preços promocionais, tomei a decisão de dividir a tabela inicial de produtos em 2, 
  onde os preços promocionais estarão apenas na tabela de promoção.

  Decidi criar essa tabela adicional, pois com apenas uma tabela, 
  o número de promoções por produto era extremamente limitado. 
  
  Já com a tabela adicional, é possível criar quantas promoções forem necessárias
*/

/* 
  Os campos de "inicio" e "encerramento" são armazenados no formato HH:mm:ss no banco de dados para garantir 
  maior nível de detalhes, mas sempre que for utilizado pela API, será tratado no formato HH:mm
*/

@Entity('Promocao')
class Sale{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Length(5, 50)
  @Column("varchar", { length: 255})
  descricao: string

  @Max(7)
  @Min(1)
  @Column()
  dia_semana: number

  @Column("char", { length: 1, default: 'N'})
  ativa: string

  @IsDate()
  @Column("time", {name: 'inicio'})
  inicio: Date
  
  @IsDate()
  @Column("time", {name: 'encerramento'})
  encerramento: Date

  @IsDecimal()
  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  preco: Decimal

  @ManyToOne((type) => Product, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'idProduto'})
  produto: Product;
}

export {Sale}