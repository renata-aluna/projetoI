import { UsuarioEntity } from "../models/entity/usuarioEntity"
import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository"
import { CursoRepository } from "../repository/cursoRepository"
import { UsuarioRepository } from "../repository/usuarioRepository"

export class UsuarioService{
    private usuarioRepository = UsuarioRepository.getInstance()
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance()
    private cursoRepository = CursoRepository.getInstance()



    async novoUsuario(data: any): Promise <UsuarioEntity>{
        if (!data.nome || !data.cpf || !data.email || !data.categoriaId || !data.cursoId) {
            throw new Error("Campos obrigatórios não preenchidos")      
        }

        if (!this.validaCPF(data.cpf)) {
            throw new Error("Esse CPF não é válido.");
        }

        const usuarioExistente = await this.usuarioRepository.buscaCpf(data.cpf)
        if (usuarioExistente) {
        throw new Error("este CPF já está cadastrado");
        }

        const categorias = await this.categoriaUsuarioRepository.listar();
        let categoriaEncontrada = false;
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === data.categoriaId) {
                categoriaEncontrada = true;
                break;
            }
        }
        if (!categoriaEncontrada){
        throw new Error("Categoria não existe.");
        }

        const cursos = await this.cursoRepository.listar()
        let cursoEncontrado = false
        for (let i = 0; i < cursos.length; i++) {
            if (cursos[i].id === data.cursoId) {
                cursoEncontrado = true
                break
            }
        }
        if (!cursoEncontrado) {
        throw new Error("Curso não existe.")
        }

        const usuario = new UsuarioEntity(
            undefined,
            data.nome,
            data.cpf,
            data.email,
            "ativo",
            data.categoriaId,
            data.cursoId
        )

        return await this.usuarioRepository.cadastraUsuario(usuario)
    }

    async buscarUsuarios(): Promise <UsuarioEntity[]>{
        return await this.usuarioRepository.listaUsuarios()
    }

    async buscarUsuarioPorCpf(cpf: string): Promise <UsuarioEntity | undefined>{
        return await this.usuarioRepository.buscaCpf(cpf)
    }

    async atualizarUsuario(cpf: string, data:any){
        const usuarioExistente = await this.usuarioRepository.buscaCpf(cpf)

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.")
        }

         if (!data.nome || !data.cpf || !data.email || !data.ativo || !data.categoriaId || !data.cursoId) {
            throw new Error("Campos obrigatórios não preenchidos")      
        }

        const categorias = await this.categoriaUsuarioRepository.listar()
        let categoriaEncontrada = false
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === data.categoriaId) {
                categoriaEncontrada = true
                break
            }
        }        if (!categoriaEncontrada){
        throw new Error("Categoria não existe.")
        }

        const cursos = await this.cursoRepository.listar()
        let cursoEncontrado = false
        for (let i = 0; i < cursos.length; i++) {
            if (cursos[i].id === data.cursoId) {
                cursoEncontrado = true
                break
            }
        }
        if (!cursoEncontrado) {
        throw new Error("Curso não existe.");
        }

        const usuarioAtualizado = new UsuarioEntity(usuarioExistente.id, data.nome, usuarioExistente.cpf, data.email, data.ativo, data.categoriaId, data.cursoId)
        await this.usuarioRepository.atualizaUsuario(cpf, usuarioAtualizado)
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