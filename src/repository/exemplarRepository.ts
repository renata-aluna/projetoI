import { ExemplarEntity } from "../models/entity/exemplarEntity"
import { LivroEntity } from "../models/entity/livroEntity"
import { executarComandoSQL } from "../database/mysql"

export class ExemplarRepository{
    private static instance: ExemplarRepository
    
    constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new ExemplarRepository()
        }
            return this.instance
    }

    public async init(): Promise<void>{
        await this.createTable()
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS exemplares (
                codigo INT AUTO_INCREMENT PRIMARY KEY,
                livro_id INT NOT NULL,
                quantidade INT NOT NULL,
                quantidade_emprestada INT NOT NULL DEFAULT 0,
                disponivel BOOLEAN NOT NULL DEFAULT TRUE,
                FOREIGN KEY (livro_id) REFERENCES livros(id)
            )
        `
        try {
            await executarComandoSQL(query, []);
            console.log("Tabela 'exemplares' criada com sucesso.")
        } catch (error) {
            console.error("Erro ao criar a tabela 'exemplares':", error)
            throw error
        }
    }

    public async cadastraExemplar(exemplar: ExemplarEntity):Promise<ExemplarEntity>{
        const query = `
            INSERT INTO exemplares (livro_id, quantidade, quantidade_emprestada, disponivel)
            VALUES (?, ?, ?, ?)
        `
        try{
            const result = await executarComandoSQL(query, [
                exemplar.livroId,
                exemplar.quantidade,
                exemplar.quantidadeEmprestada,
                exemplar.disponivel
            ])
            
            const codigo = result.insertId
            return new ExemplarEntity(
                codigo,
                exemplar.livroId,
                exemplar.quantidade,
                exemplar.quantidadeEmprestada,
                exemplar.disponivel
            )
        } catch(error){
            console.error("Erro ao cadastrar exemplar:", error)
            throw error
        }
    }

    public async listaExemplares(): Promise <ExemplarEntity[]>{
        const query = "SELECT * FROM exemplares"
        try{
            const resultado = await executarComandoSQL(query, [])
            return resultado.map((row: any) => {
                const estoque = new ExemplarEntity(row.codigo,row.livro_id, row.quantidade,row.quantidade_emprestada,row.disponivel)
                return estoque
            })
        } catch(error){
            console.error("Erro ao listar exemplares:", error)
            throw error
        }
    }

    public async buscaExemplarPorCodigo(codigo: number): Promise <ExemplarEntity | undefined>{
        const query = "SELECT * FROM exemplares WHERE codigo = ?"
        try {
            const resultado = await executarComandoSQL(query, [codigo]);
            if (resultado.length === 0) return undefined

            const row = resultado[0]
            return new ExemplarEntity(row.codigo,row.livro_id,row.quantidade,row.quantidade_emprestada,row.disponivel)
        } catch (error) {
            console.error(`Erro ao buscar exemplar por código ${codigo}:`, error)
            throw error
        }
    }

    public async atualizaExemplar(codigo: number, novosDados: ExemplarEntity): Promise <void>{
        const query = `
            UPDATE exemplares 
            SET livro_id = ?, quantidade = ?, quantidade_emprestada = ?, disponivel = ?
            WHERE codigo = ?
        `
        try {
            const resultado = await executarComandoSQL(query, [
                novosDados.livroId,
                novosDados.quantidade,
                novosDados.quantidadeEmprestada,
                novosDados.disponivel,
                codigo
            ])

            if (resultado.affectedRows === 0) {
                throw new Error("Exemplar não encontrado para atualização.")
            }

            console.log("Exemplar atualizado com sucesso:", codigo)
        } catch (error) {
            console.error("Erro ao atualizar exemplar:", error)
            throw error
        } 
    }
    public async removeExemplar(codigo: number) : Promise <void> {
        const query = "DELETE FROM exemplares WHERE codigo = ?"
        try {
            const resultado = await executarComandoSQL(query, [codigo])

            if (resultado.affectedRows === 0) {
                throw new Error("Exemplar não encontrado para remoção.")
            }

            console.log("Exemplar removido com sucesso:", codigo)
        } catch (error) {
            console.error("Erro ao remover exemplar:", error)
            throw error
        }
    }
    
}