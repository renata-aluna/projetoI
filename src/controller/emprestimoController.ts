import { Request, Response } from "express";
import { EmprestimoService } from "../service/emprestimoService";

export class EmprestimoController{
    private emprestimoService = new EmprestimoService()

    cadastrarEmprestimo(req: Request, res: Response) {
        try{    
            const emprestimo = this.emprestimoService.novoEmprestimo(req.body)
            res.status(201).json(emprestimo)
        } catch(error: unknown){
            let message: string = "Erro ao cadastrar emprestimo"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

    listaEmprestimo(req: Request, res: Response) {
        try{    
            const emprestimos = this.emprestimoService.listarEmprestimo()
            res.status(201).json(emprestimos)
        } catch(error: unknown){
            let message: string = "Erro ao listar emprestimos"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }

     DevolveEmprestimo(req: Request, res: Response) {
        try{    
            const idNum = parseInt(req.params.id)
            const emprestimos = this.emprestimoService.realizarDevolucao(idNum, req.body)
            res.status(201).json(emprestimos)
        } catch(error: unknown){
            let message: string = "Erro ao listar emprestimos"
            if(error instanceof Error){
                message = error.message
            }
            res.status(400).json({
                message: message
            })
        }
    }
}