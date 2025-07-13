import { LivroEntity } from "../models/entity/livroEntity";
import { categoriasLivro } from "../repository/categoriaLivroRepository";
import { LivroRepository } from "../repository/livroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance()

    novoLivro(data: any): LivroEntity{
        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId){
            throw new Error("Campos obrigatórios não preenchidos")    
        }

        if (!categoriasLivro.find(categoria => categoria.id === data.categoriaId)){
            throw new Error("Categoria não existe!!!");
        }

        const livros = this.livroRepository.listaLivros(); 
        const combinado = livros.find(livro => livro.autor == data.autor && livro.editora === data.editora && livro.edicao == data.edicao);

        if (combinado) {
            throw new Error("Já existe livro com essa combinação de autor, editora e edição.");
        }

        const livro = new LivroEntity (undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId)
        this.livroRepository.cadastraLivro(livro)

        return livro
    }

    buscarLivro(): LivroEntity[]{
        return this.livroRepository.listaLivros()
    }

    buscarLivroPorIsbn(isbn: string): LivroEntity | undefined{
        return this.livroRepository.buscaIsbn(isbn)
    }

    atualizarLivro(isbn: string, data: any){
        const livroExistente = this.livroRepository.buscaIsbn(isbn)

        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId){
            throw new Error("Campos obrigatórios não preenchidos")    
        }

        if(!livroExistente){
            throw new Error ("Livro não encontrado.")
        }

        if (!categoriasLivro.find(categoria => categoria.id === data.categoriaId)){
            throw new Error("Categoria não existe!!!");
        }
        
        const livroNovo = new LivroEntity(livroExistente.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId)
        return this.livroRepository.atualizaLivro(isbn, livroNovo)
    }

    removerLivro(isbn: string){
        this.livroRepository.removeLivro(isbn)
    }
}