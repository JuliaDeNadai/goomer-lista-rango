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

  // TODO: se eu excluir a categoria o que acontece???
  @ManyToOne((type) => Category/* , { onDelete: "CASCADE"} */)
  @JoinColumn({ name: 'idCategoria'})
  categoria: Category;

  @IsDecimal()
  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
  preco: Decimal

  @ManyToOne((type) => Restaurant, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'idRestaurante'})
  restaurante: Restaurant;

  // TODO: questão da imagem
}

export {Product}