import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

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

      // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Postagem da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}