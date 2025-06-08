import { Request, Response } from "express";
import { UsuarioService } from "../service/usuarioService"

export class UsuarioController{
    private usuarioService = new UsuarioService()

    criaUsuario(req: Request, res: Response): void {
        try{
            this.usuarioService.novoUsuario(req.body)
            res.status(201).json({message: "Usuário criado com sucesso!"});
        } catch(error: unknown){
            let message: string = "Não foi possível criar o usuário!";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    buscaUsuario(req: Request, res: Response): void {
        try{
            const usuarios = this.usuarioService.buscarUsuarios()
            res.status(200).json(usuarios);
        } catch(error: unknown){
            let message: string = "Não foi possível listar os usuários";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    buscaUsuarioPorCpf(req: Request, res: Response): void {
        try{
            const usuario = this.usuarioService.buscarUsuarioPorCpf(req.params.cpf)
            res.status(200).json(usuario);
        } catch(error: unknown){
            let message: string = "Não foi possível encontrar usuário por este CPF";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    atualizaUsuario(req: Request, res: Response): void {
        try{
            const usuario = this.usuarioService.atualizarUsuario(req.params.cpf, req.body)
            res.status(200).json({message : "Usuário atualizado com sucesso", usuario: usuario});
        } catch(error: unknown){
            let message: string = "Não foi possível atualizar o usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({message: message});
        }
    }

    removeUsuario(req: Request, res: Response): void {
        try{
            this.usuarioService.removerUsuario(req.params.cpf)
            res.status(200).json({message : "Usuário removido com sucesso"});
        } catch(error: unknown){           
            let message: string = "Não foi possível remover o usuário";           
            if(error instanceof Error){           
                message = error.message;           
            }
            res.status(400).json({message: message});           
        }
    }

}