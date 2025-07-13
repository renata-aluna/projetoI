import { UsuarioEntity } from "../models/entity/usuarioEntity"
import { executarComandoSQL } from "../database/mysql"


export class UsuarioRepository{
    private static instance: UsuarioRepository

    constructor(){}

    public static getInstance(){
        if (!this.instance){
            this.instance = new UsuarioRepository()
        }
            return this.instance
    }

    async init(): Promise<void>{
        await this.createTable()
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                cpf VARCHAR(14) UNIQUE NOT NULL,
                email VARCHAR(100) NOT NULL,
                ativo ENUM('ativo', 'inativo', 'suspenso') NOT NULL,
                categoriaId INT NOT NULL,
                cursoId INT NOT NULL
            )
        `
        try {
            await executarComandoSQL(query, [])
            console.log("Tabela 'usuarios' criada com sucesso!")
        } catch (error) {
            console.error("Erro ao criar a tabela 'usuarios':", error)
            throw error
        }
    }

    async cadastraUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>{
        const query = `
            INSERT INTO usuarios (nome, cpf, email, ativo, categoriaId, cursoId)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        const valores = [
            usuario.nome,
            usuario.cpf,
            usuario.email,
            usuario.ativo,
            usuario.categoriaId,
            usuario.cursoId
        ]
        try {
            const resultado: any = await executarComandoSQL(query, valores);
            return new UsuarioEntity(
                resultado.insertId,
                usuario.nome,
                usuario.cpf,
                usuario.email,
                usuario.ativo,
                usuario.categoriaId,
                usuario.cursoId
            )
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error)
            throw error
        }
    }

    async listaUsuarios(): Promise <UsuarioEntity[]>{
        const query = `SELECT * FROM usuarios ORDER BY nome`
        const resultado: any[] = await executarComandoSQL(query, [])
        return resultado.map(row => new UsuarioEntity(
            row.id,
            row.nome,
            row.cpf,
            row.email,
            row.ativo,
            row.categoriaId,
            row.cursoId
        ))
    }

    async buscaCpf(cpf:string): Promise <UsuarioEntity | undefined>{
        const query = `SELECT * FROM usuarios WHERE cpf = ?`
        const resultado: any[] = await executarComandoSQL(query, [cpf])

        if (resultado.length === 0) return undefined

        const row = resultado[0]
        return new UsuarioEntity(row.id, row.nome, row.cpf, row.email, row.ativo, row.categoriaId, row.cursoId)
    }

    async buscaId(id:number): Promise <UsuarioEntity | undefined>{
        const query = `SELECT * FROM usuarios WHERE id = ?`
        const resultado: any[] = await executarComandoSQL(query, [id])

        if (resultado.length === 0) return undefined

        const row = resultado[0]
        return new UsuarioEntity(row.id, row.nome, row.cpf, row.email, row.ativo, row.categoriaId, row.cursoId)
    }

    async atualizaUsuario(cpf: string, novosDados: UsuarioEntity): Promise<boolean> {
        const query = `
            UPDATE usuarios SET nome = ?, email = ?, ativo = ?, categoriaId = ?, cursoId = ?
            WHERE cpf = ?
        `
        const valores = [
            novosDados.nome,
            novosDados.email,
            novosDados.ativo,
            novosDados.categoriaId,
            novosDados.cursoId,
            cpf
        ];

        try {
            const resultado: any = await executarComandoSQL(query, valores)
            return resultado.affectedRows > 0
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
            throw error
        } 
    }

    async removeUsuario(cpf: string): Promise<boolean> {
        const query = `DELETE FROM usuarios WHERE cpf = ?`
        try {
            const resultado: any = await executarComandoSQL(query, [cpf])
            return resultado.affectedRows > 0
        } catch (error) {
            console.error("Erro ao remover usuário:", error)
            throw error
        }
    }
}
