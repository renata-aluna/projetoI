import { UsuarioEntity } from "../models/entity/usuarioEntity"
import { categoriasUsuario } from "../repository/categoriaUsuarioRepository";
import { cursos } from "../repository/cursoRepository";
import { UsuarioRepository } from "../repository/usuarioRepository"

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()
    

    novoUsuario(data: any): UsuarioEntity{
        if (!data.nome || !data.cpf || !data.email || !data.categoriaId || !data.cursoId) {
            throw new Error("Campos obrigatórios não preenchidos")      
        }

        if (!this.validaCPF(data.cpf)) {
            throw new Error("Esse CPF não é válido.");
        }

        if (this.usuarioRepository.buscaCpf(data.cpf)) {
        throw new Error("Esse CPF já foi utilizado.");
        }

        if (!categoriasUsuario.find(categoria => categoria.id === data.categoriaId)){
        throw new Error("Categoria não existe.");
        }

        if (!cursos.find(curso => curso.id === data.cursoId)) {
        throw new Error("Curso não existe.");
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

        if (!categoriasUsuario.find(categoria => categoria.id === data.categoriaId)){
        throw new Error("Categoria não existe.");
        }

        if (!cursos.find(curso => curso.id === data.cursoId)) {
        throw new Error("Curso não existe.");
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

    private validaCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, "");

        if (cpf.length !== 11) {
            return false;
        }

        const primeiroDigito = cpf[0];
        let todosIguais: boolean = true;

        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] !== primeiroDigito) {
                todosIguais = false;
                break;
            }
        }

        if(todosIguais) {
            return false;
        }
        
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * (10 - i);
        }

        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 !== parseInt(cpf[9])) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * (11 - i);
        }

        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        if (digito2 !== parseInt(cpf[10])) {
            return false;
        }

        return true;
    }
}