import { Request, Response } from "express";
import { LivroService } from "../service/livroService";

export class LivroController{
    private livroService = new LivroService()

    criaLivro(req: Request, res: Response): void {
        try{
            this.livroService.novoLivro(req.body)
            res.status(201).json({message: "Livro criado com sucesso!"});
        } catch(error: unknown){
            let message: string = "Não foi possível criar o livro!";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    buscaLivro(req: Request, res: Response): void {
        try{
            const livros = this.livroService.buscarLivro()
            res.status(200).json(livros);
        } catch(error: unknown){
            let message: string = "Não foi possível listar os livros";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    buscaLivroPorIsbn(req: Request, res: Response): void {
        try{
            const livro = this.livroService.buscarLivroPorIsbn(req.params.isbn)
            res.status(200).json(livro);
        } catch(error: unknown){
            let message: string = "Não foi possível encontrar livro por este ISBN";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    atualizaLivro(req: Request, res: Response): void {
        try{
            const livro = this.livroService.atualizarLivro(req.params.isbn, req.body)
            res.status(200).json({message : "Livro atualizado com sucesso", livro: livro});
        } catch(error: unknown){
            let message: string = "Não foi possível atualizar o livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    removeLivro(req: Request, res: Response): void {
        try{
            this.livroService.removerLivro(req.params.isbn)
            res.status(200).json({message : "Livro removido com sucesso"});
        } catch(error: unknown){           
            let message: string = "Não foi possível remover o livro";           
            if(error instanceof Error){           
                message = error.message;           
            }
            res.status(400).json({message: message});           
        }
    }
    
} 