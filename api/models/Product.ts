import { Transform } from "class-transformer"
import { Length, IsDecimal } from "class-validator"
import Decimal from "decimal.js"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { DecimalToString, DecimalTransformer } from "../utils/decimal.transformer"
import { Category } from "./Category"
import { Restaurant } from "./Restaurant"

@Entity('Produto')
class Product{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Length(5, 50)
  @Column("varchar", { length: 255})
  nome: string

  // Decidi fazer o campo categoria ser uma tabela, para padronizar as categorias
  @ManyToOne((type) => Category/* , { onDelete: "CASCADE"} */)
  @JoinColumn({ name: 'idCategoria'})
  categoria: Category;

  @IsDecimal()
  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  preco: Decimal

  @ManyToOne((type) => Restaurant, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'idRestaurante'})
  restaurante: Restaurant;

}

export {Product}