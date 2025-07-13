import { EmprestimoEntity } from "../models/entity/emprestimoEntity";
import { executarComandoSQL } from "../database/mysql";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository

    constructor() {}

    static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    public async init(): Promise<void>{
        await this.createTable()
    }
    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS emprestimos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                estoque_id INT NOT NULL,
                data_emprestimo DATETIME NOT NULL,
                data_devolucao DATETIME NOT NULL,
                data_entrega DATETIME,
                dias_atraso INT DEFAULT 0,
                suspensao_ate DATETIME,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                FOREIGN KEY (estoque_id) REFERENCES exemplares(codigo)
            )
        `
        try {
            await executarComandoSQL(query, [])
            console.log("Tabela 'emprestimos' criada com sucesso!!")
        } catch (error) {
            console.error('Erro ao criar tabela de empréstimos:', error)
            throw error
        }
    }

    public async cadastraEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity>{
        const query = `
            INSERT INTO emprestimos 
            (usuario_id, estoque_id, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        
        try {
            const formatDate = (date: Date | null) => date ? date.toISOString().replace('T', ' ').replace(/\..+/, '') : null
            const result = await executarComandoSQL(query, [
                emprestimo.usuarioId,
                emprestimo.estoqueId,
                formatDate(emprestimo.dataEmprestimo),
                formatDate(emprestimo.dataDevolucao),
                formatDate(emprestimo.dataEntrega),
                emprestimo.diasAtraso,
                formatDate(emprestimo.suspensaoAte)
            ])

            return new EmprestimoEntity(
                result.insertId,
                emprestimo.usuarioId,
                emprestimo.estoqueId,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.dataEntrega,
                emprestimo.diasAtraso,
                emprestimo.suspensaoAte
            )
        } catch (error) {
            console.error('Erro ao cadastrar empréstimo:', error)
            throw error
        }
    }


    public async listaEmprestimos():Promise <EmprestimoEntity[]>{
        const query = "SELECT * FROM emprestimos";
        
        try {
            const result = await executarComandoSQL(query, []);
            return result.map((row: any) => new EmprestimoEntity(row.id,row.usuario_id,row.estoque_id,row.data_emprestimo,row.data_devolucao,row.data_entrega,row.dias_atraso,row.suspensao_ate))
        } catch (error) {
            console.error('Erro ao listar empréstimos:', error)
            throw error
        }
    }

    public async atualizaEmprestimo(id: number, novoEmprestimo: EmprestimoEntity): Promise <void>{
        const query = `
            UPDATE emprestimos SET
                usuario_id = ?,
                estoque_id = ?,
                data_emprestimo = ?,
                data_devolucao = ?,
                data_entrega = ?,
                dias_atraso = ?,
                suspensao_ate = ?
            WHERE id = ?
        `
        try {
            await executarComandoSQL(query, [
                novoEmprestimo.usuarioId,
                novoEmprestimo.estoqueId,
                novoEmprestimo.dataEmprestimo,
                novoEmprestimo.dataDevolucao,
                novoEmprestimo.dataEntrega,
                novoEmprestimo.diasAtraso,
                novoEmprestimo.suspensaoAte,
                id
            ])
        } catch (error) {
            console.error('Erro ao atualizar empréstimo:', error)
            throw error
        }
    }
}