import { CategoriaLivroEntity } from "../models/entity/categoriaLivroEntity";
import { executarComandoSQL } from "../database/mysql"

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;

    private constructor() {}

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository()
        }
        return this.instance
    }

    public async init(): Promise<void> {
            await this.createTable()
            await this.insereCategoriasPadrao()    
    }

    private async createTable(): Promise<void> {
        try {
            const query = 
                `CREATE TABLE IF NOT EXISTS categorias_livro (
                    id INT PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL UNIQUE
                )`
            await executarComandoSQL(query, [])
            console.log('Tabela das categorias_livro criada!')
        } catch (error) {
            throw new Error('Falha ao criar tabela de categorias')
        }
    }

    private async insereCategoriasPadrao(): Promise<void> {
        try {
            const resultado = await executarComandoSQL(
                "SELECT COUNT(*) as count FROM categorias_livro", 
                []
            )

            if (resultado[0].count > 0) return
                const categorias = [
                    new CategoriaLivroEntity(1, "Romance"),
                    new CategoriaLivroEntity(2, "Computação"),
                    new CategoriaLivroEntity(3, "Letras"),
                    new CategoriaLivroEntity(4, "Gestão")
                ]

            for (const categoria of categorias) {
                await executarComandoSQL(
                    "INSERT INTO categorias_livro (id, nome) VALUES (?, ?)",
                    [categoria.id, categoria.nome]
                )
            }
            console.log('Categorias padrão inseridas com sucesso!!')
        } catch (error) {
            throw new Error('Falha ao inserir categorias padrão');
        }
    }

    public async listar(): Promise<CategoriaLivroEntity[]> {
            const resultado = await executarComandoSQL(
                "SELECT * FROM categorias_livro ORDER BY id", 
                []
            )
            return resultado.map((row: any) => new CategoriaLivroEntity(row.id, row.nome))
    }
}

