import { CategoriaUsuarioEntity } from "../models/entity/categoriaUsuarioEntity"
import { executarComandoSQL } from "../database/mysql"

export class CategoriaUsuarioRepository{
      private static instance: CategoriaUsuarioRepository;
      
      private constructor() {}

      public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository()
        }
        return this.instance
      }

      public async init(): Promise<void> {
        await this.createTable();
        await this.insereCategoriasPadrao()
      }

      private async createTable(): Promise<void> {
            try{
                  const query = `
                        CREATE TABLE IF NOT EXISTS categorias_usuario (
                              id INT PRIMARY KEY,
                              nome VARCHAR(255) NOT NULL UNIQUE
                        )`
                  await executarComandoSQL(query, [])
                  console.log('Tabela das categorias_usuario criada!')
            }catch (error) {
            throw new Error('Falha ao criar tabela de categorias')
            }
      }

      private async insereCategoriasPadrao(): Promise<void> {
            try{
                  const resultado = await executarComandoSQL(
                        "SELECT COUNT(*) as count FROM categorias_usuario", 
                        []
                  )

                  if (resultado[0].count > 0) return

                        const categorias = [
                              new CategoriaUsuarioEntity(1, "Professor"),
                              new CategoriaUsuarioEntity(2, "Aluno"),
                              new CategoriaUsuarioEntity(3, "Bibliotecário")
                        ]

                  for (const categoria of categorias) {
                        await executarComandoSQL(
                        "INSERT INTO categorias_usuario (id, nome) VALUES (?, ?)",
                        [categoria.id, categoria.nome]
                        )
                  }
                  }catch (error) {
                        throw new Error('Falha ao inserir categorias padrão')
                  }
            }

      public async listar(): Promise<CategoriaUsuarioEntity[]> {
        const resultado = await executarComandoSQL(
            "SELECT * FROM categorias_usuario ORDER BY id", 
            []
        )
        return resultado.map((row: any) => new CategoriaUsuarioEntity(row.id, row.nome))
      } 
}

