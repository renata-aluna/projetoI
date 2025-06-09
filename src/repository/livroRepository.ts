import { LivroEntity } from "../models/livroEntity"

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

    cadastraLivro(livro: LivroEntity): void{
        this.livroLista.push(livro)
    }

    listaLivros(): LivroEntity[]{
        return this.livroLista
    }

    buscaIsbn(isbn: string): LivroEntity | undefined{
        return this.livroLista.find(l => l.isbn === isbn)
    }

    buscaId(id: number): LivroEntity | undefined{
        return this.livroLista.find(l => l.id === id)
    }

    atualizaLivro(isbn: string, novosDados: LivroEntity){
        const index = this.livroLista.findIndex( l => l.isbn === isbn)
        if(index === -1){
             throw new Error ("Livro não encontrado!")
        }
        this.livroLista[index] = novosDados
    }

    removeLivro(isbn: string): void {
        const index = this.livroLista.findIndex(l => l.isbn === isbn)
        if(index === -1){
            throw new Error("Livro não encontrado!")
        }
        this.livroLista.splice(index, 1)
    }
}