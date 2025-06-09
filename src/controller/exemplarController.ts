import { Request, Response } from "express";
import { ExemplarService } from "../service/exemplarService";

export class ExemplarController{
    private exemplarService = new ExemplarService()

    criaExemplar(req: Request, res: Response): void {
        try{
            this.exemplarService.novoExemplar(req.body)
            res.status(201).json({message: "Exemplar criado com sucesso!"});
        } catch(error: unknown){
            let message: string = "Não foi possível criar o exemplar!";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    listaExemplares(req: Request, res: Response): void {
        try{
            const exemplar = this.exemplarService.listarExemplares()
            res.status(200).json(exemplar);
        } catch(error: unknown){
            let message: string = "Não foi possível listar os exemplares";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }
    buscaExemplarporCodigo(req: Request, res: Response): void {
        try{
            const codigoNum = parseInt(req.params.codigo)
            const exemplar = this.exemplarService.buscarExemplarPorCodigo(codigoNum)
            res.status(200).json(exemplar);
        } catch(error: unknown){
            let message: string = "Não foi possível encontrar o exemplar por este codigo";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    atualizaExemplar(req: Request, res: Response): void {
        try{
            const codigoNum = parseInt(req.params.codigo)
            const exemplar = this.exemplarService.atualizarExemplar(codigoNum, req.body)
            res.status(200).json({message : "Exemplar atualizado com sucesso", exemplar: exemplar});
        } catch(error: unknown){
            let message: string = "Não foi possível atualizar o exemplar";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    removeExemplar(req: Request, res: Response): void {
        try{
            const codigoNum = parseInt(req.params.codigo)
            this.exemplarService.removerExemplar(codigoNum)
            res.status(200).json({message : "Exemplar removido com sucesso"});
        } catch(error: unknown){           
            let message: string = "Não foi possível remover o exemplar";           
            if(error instanceof Error){           
                message = error.message;           
            }
            res.status(400).json({message: message});           
        }
    }

}