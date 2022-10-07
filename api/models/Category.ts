import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Categoria')
class Category{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Length(3, 20)
  @Column("varchar", { length: 255})
  nome: string
}

export {Category}