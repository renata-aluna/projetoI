import { LivroEntity } from "../models/entity/livroEntity";
import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository";
import { LivroRepository } from "../repository/livroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance()
    private categoriaRepository = CategoriaLivroRepository.getInstance()

    async novoLivro(data: any): Promise<LivroEntity>{
        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId){
            throw new Error("Campos obrigatórios não preenchidos")    
        }

        const categorias = await this.categoriaRepository.listar();
        let categoriaEncontrada = false
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === data.categoriaId) {
                categoriaEncontrada = true
                break
            }
        }
        if (!categoriaEncontrada) {
            throw new Error("Categoria não existe!")
        }

        const livros = await this.livroRepository.listaLivros()
        const combinado = livros.find(livro => livro.autor == data.autor && livro.editora === data.editora && livro.edicao == data.edicao)

        if (combinado) {
            throw new Error("Já existe livro com essa combinação de autor, editora e edição.")
        }

        const livro = new LivroEntity (undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId)
        return await this.livroRepository.cadastraLivro(livro)
    }

    async buscarLivro(): Promise<LivroEntity[]>{
        return await this.livroRepository.listaLivros()
    }

    async buscarLivroPorIsbn(isbn: string): Promise <LivroEntity | undefined>{
        return await this.livroRepository.buscaIsbn(isbn)
    }

    async atualizarLivro(isbn: string, data: any){
        const livroExistente = await this.livroRepository.buscaIsbn(isbn)

        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId){
            throw new Error("Campos obrigatórios não preenchidos")    
        }

        if(!livroExistente){
            throw new Error ("Livro não encontrado.")
        }

        const categorias = await this.categoriaRepository.listar()
        let categoriaEncontrada = false
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i].id === data.categoriaId) {
                categoriaEncontrada = true
                break
            }
        }
        if (!categoriaEncontrada) {
            throw new Error("Categoria não existe!")
        }
        
        const livroNovo = new LivroEntity(livroExistente.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId)
        return this.livroRepository.atualizaLivro(isbn, livroNovo)
    }

    async removerLivro(isbn: string): Promise <void>{
        await this.livroRepository.removeLivro(isbn)
    }
}