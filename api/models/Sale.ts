import { Length, IsDate, IsDecimal, Max, Min } from "class-validator";
import Decimal from "decimal.js";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DecimalTransformer } from "../utils/decimal.transformer";
import { Product } from "./Product";

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