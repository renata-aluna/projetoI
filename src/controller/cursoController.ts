import { Request, Response } from "express";
import { CursoService } from "../service/cursoService";

export class CursoController{
    private cursoService = new CursoService()

    listarCursos(req: Request, res: Response): void {
        try{
            const lista = this.cursoService.listaCursos()
            res.status(200).json(lista);
        } catch(error: unknown){
            let message: string = "Não foi possível listar os cursos";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }
}