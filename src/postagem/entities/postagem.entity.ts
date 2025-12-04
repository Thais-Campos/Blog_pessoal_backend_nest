import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: 'tb_postagens' }) // indicando que a classe é uma entidades para criar uma tabela no db
export class Postagem {

    @PrimaryGeneratedColumn() // Chave primária e auto incremental 
    id: number;

    @IsNotEmpty() // Validador de objeto 
    @Column({ length: 100, nullable: false }) // Regra do MySQL - NOT NULL    
    titulo: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    texto: string

    @UpdateDateColumn()
    data: Date

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema
}