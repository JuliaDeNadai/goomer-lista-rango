import { Length,IsDate  } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('Restaurante')
export class Restaurant {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Length(5, 50)
    @Column("varchar", {length: 255})
    nome: string

    @Length(5, 60)
    @Column("varchar", {length: 255})
    endereco: string

    @Column("varchar", {length: 255, default: null})
    foto: string

    @IsDate()
    @Column("time", {name: 'abertura'})
    abertura: Date
    
    @IsDate()
    @Column("time", {name: 'encerramento'})
    encerramento: Date
}