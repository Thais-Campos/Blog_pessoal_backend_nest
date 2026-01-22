import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)     // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos
@Controller("/postagens") //indica que a classe é uma controller 
@ApiBearerAuth()
export class PostagemController {

    // Dentro do Construtor injetamos o postagemService para podermos usar seus métodos
    constructor(private readonly postagemService: PostagemService) { }

    @Get()// Indica que esse método lida com Requisições do Tipo GET
    @HttpCode(HttpStatus.OK) // Monta a Resposta HTTP para o Cliente com o status 200
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();// Invoca a Service e chama o método correspondente
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postagemService.delete(id);
    }
}