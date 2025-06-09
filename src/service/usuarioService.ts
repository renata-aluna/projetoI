import { UsuarioEntity } from "../models/usuarioEntity"
import { UsuarioRepository } from "../repository/usuarioRepository"

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()
    

    novoUsuario(data: any): UsuarioEntity{
        if (!data.nome || !data.cpf || !data.email || !data.categoriaId || !data.cursoId) {
            throw new Error("Campos obrigatórios não preenchidos")      
        }

        const usuario = new UsuarioEntity(undefined, data.nome, data.cpf, data.email, "ativo", data.categoriaId, data.cursoId)
        this.usuarioRepository.cadastraUsuario(usuario)

        return usuario
    }

    buscarUsuarios(): UsuarioEntity[]{
        return this.usuarioRepository.listaUsuarios()
    }

    buscarUsuarioPorCpf(cpf: string): UsuarioEntity | undefined{
        return this.usuarioRepository.buscaCpf(cpf)
    }

    atualizarUsuario(cpf: string, data:any){
        const usuarioExistente = this.usuarioRepository.buscaCpf(cpf);

         if (!data.nome || !data.cpf || !data.email || !data.ativo || !data.categoriaId || !data.cursoId) {
            throw new Error("Campos obrigatórios não preenchidos")      
        }

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.")
        }
        const usuarioNovo = new UsuarioEntity(usuarioExistente.id, data.nome, data.cpf, data.email, data.ativo, data.categoriaId, data.cursoId)
        return this.usuarioRepository.atualizaUsuario(cpf, usuarioNovo)
    }

    removerUsuario(cpf: string){
        this.usuarioRepository.removeUsuario(cpf)
    }
}