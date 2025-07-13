import { LivroEntity } from "../models/entity/livroEntity"
import { executarComandoSQL } from "../database/mysql"

export class LivroRepository{
    private static instance: LivroRepository
    private livroLista: LivroEntity[]=[]

    constructor (){}

    static getInstance(){
        if (!this.instance){
            this.instance = new LivroRepository()
        }
            return this.instance
    }

    public async init(): Promise<void>{
        await this.createTable()
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS livros (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(255) NOT NULL,
                editora VARCHAR(255) NOT NULL,
                edicao VARCHAR(50) NOT NULL,
                isbn VARCHAR(20) NOT NULL UNIQUE,
                categoria_id INT NOT NULL,
                FOREIGN KEY (categoria_id) REFERENCES categorias_livro(id)
            )
        `
        try {
            await executarComandoSQL(query, [])
            console.log("Tabela 'livros' criada com sucesso!!")
        } catch (error) {
            console.error("Erro ao criar a tabela 'livros':", error)
            throw error
        }
    }

    public async cadastraLivro(livro: LivroEntity): Promise<LivroEntity>{
        const query = `
            INSERT INTO livros (titulo, autor, editora, edicao, isbn, categoria_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        try {
            const result = await executarComandoSQL(query, [
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.edicao,
                livro.isbn,
                livro.categoriaId
            ])
            const id = result.insertId
            return new LivroEntity(
                id,
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.edicao,
                livro.isbn,
                livro.categoriaId
            )
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error)
            throw error
        }
    }

    public async listaLivros(): Promise <LivroEntity[]>{
         const query = "SELECT * FROM livros"
        const result = await executarComandoSQL(query, []);
        return result.map((row: any) => new LivroEntity(
            row.id,
            row.titulo,
            row.autor,
            row.editora,
            row.edicao,
            row.isbn,
            row.categoria_id
        ))
    }

    public async buscaIsbn(isbn: string): Promise <LivroEntity | undefined>{
        const query = "SELECT * FROM livros WHERE isbn = ?"
        const resultado: any[] = await executarComandoSQL(query, [isbn])
        if (resultado.length === 0) return undefined

        const row = resultado[0];
        return new LivroEntity(row.id, row.titulo, row.autor, row.editora,row.edicao, row.isbn, row.categoria_id)
    }
    
    public async buscaId(id: number): Promise <LivroEntity | undefined>{
        const query = "SELECT * FROM livros WHERE id = ?"
        const resultado: any[] = await executarComandoSQL(query, [id])
        if (resultado.length === 0) return undefined

        const row = resultado[0];
        return new LivroEntity(row.id, row.titulo, row.autor, row.editora,row.edicao, row.isbn, row.categoria_id)
    }

    public async atualizaLivro(isbn: string, novosDados: LivroEntity): Promise<void>{
        const query = `
            UPDATE livros 
            SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoria_id = ?
            WHERE isbn = ?
        `;
        try {
            const resultado = await executarComandoSQL(query, [
                novosDados.titulo,
                novosDados.autor,
                novosDados.editora,
                novosDados.edicao, novosDados.categoriaId,
                isbn
            ])
            if (resultado.affectedRows === 0) {
                throw new Error("Livro não encontrado para atualização.")
            }
            console.log("Livro atualizado com sucesso:", isbn)
        } catch (error) {
            console.error("Erro ao atualizar livro:", error)
            throw error
        }
    }

    public async removeLivro(isbn: string): Promise<void> {
        const query = "DELETE FROM livros WHERE isbn = ?"
        try {
            const resultado = await executarComandoSQL(query, [isbn])
            if (resultado.affectedRows === 0) {
                throw new Error("Livro não encontrado para remoção.")
            }
            console.log("Livro removido com sucesso:", isbn)
        } catch (error) {
            console.error("Erro ao remover livro:", error)
            throw error
        }
    }
}