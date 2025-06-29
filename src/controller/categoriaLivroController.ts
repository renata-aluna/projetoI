import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/categoriaLivroService";

export class CategoriaLivroController{
    private categoriaLivroService = new CategoriaLivroService()

    listaCategoriasLivro(req: Request, res: Response): void {
            try{
                const lista = this.categoriaLivroService.listarCategoriasLivros()
                res.status(200).json(lista);
            } catch(error: unknown){
                let message: string = "Não foi possível listar as categorias de livro";
                if(error instanceof Error){
                    message = error.message;
                }
                res.status(400).json({message: message});
            }
        }
}