import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'tb_postagens' }) // indicando que a classe é uma entidades para criar uma tabela no db
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn() // Chave primária e auto incremental 
    id: number;

    @ApiProperty()
    @IsNotEmpty() // Validador de objeto 
    @Column({ length: 100, nullable: false }) // Regra do MySQL - NOT NULL    
    titulo: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    texto: string

    @ApiProperty()
    @UpdateDateColumn()
    data: Date

    @ApiProperty()
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema


    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}