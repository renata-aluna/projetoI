import { CursoEntity } from "../models/entity/cursoEntity";
import { executarComandoSQL } from "../database/mysql"

export class CursoRepository{
    private static instance: CursoRepository

    private constructor() {}

    public static getInstance(): CursoRepository {
        if (!this.instance) {
            this.instance = new CursoRepository()
        }
        return this.instance
    }

    public async init(): Promise<void> {
        await this.createTable()
        await this.insereCursosPadrao()
    }

    private async createTable(): Promise<void> {
        try{
            const query = `
            CREATE TABLE IF NOT EXISTS cursos (
                id INT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE
            )`
            await executarComandoSQL(query, [])
            console.log('Tabela de cursos criada!')
        }catch(error) {
            throw new Error('Falha ao criar tabela de cursos')

        }
    }

    private async insereCursosPadrao(): Promise<void> {
        try{
            const resultado = await executarComandoSQL("SELECT COUNT(*) as count FROM cursos", [])  
            if (resultado[0].count > 0) return

            const cursosPadrao = [
                new CursoEntity(1, "Administração"),
                new CursoEntity(2, "ADS"),
                new CursoEntity(3, "Pedagogia")
            ]

            for (const curso of cursosPadrao) {
                await executarComandoSQL(
                    "INSERT INTO cursos (id, nome) VALUES (?, ?)",
                    [curso.id, curso.name]
                )
            }
        } catch{
            throw new Error('Falha ao inserir os cursos padrões')
        }
    }

    public async listar(): Promise<CursoEntity[]> {
        const resultado = await executarComandoSQL("SELECT * FROM cursos ORDER BY id", []);
        return resultado.map((row: any) => new CursoEntity(row.id, row.nome))
    }

 
}
