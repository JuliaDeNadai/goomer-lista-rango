import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/* 
  Decidi tornar o campo "categoria" da tabela "Produto" em uma nova tabela, que, mesmo sendo bem simples,
  evita erros de digitação que podem ocorrer.
*/
@Entity('Categoria')
class Category{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Length(3, 20)
  @Column("varchar", { length: 255})
  nome: string
}

export {Category}