import { Request, Response } from "express";
import { CategoriaUsuarioService } from "../service/categoriaUsuarioService";

export class CategoriaUsuarioController{
    private categoriaUsuarioService  = new CategoriaUsuarioService()

    listaCategoriasUsuario(req: Request, res: Response): void {
        try{
            const lista = this.categoriaUsuarioService.listarCategoriasUsuarios()
            res.status(200).json(lista);
        } catch(error: unknown){
            let message: string = "Não foi possível listar as categorias do usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }
}