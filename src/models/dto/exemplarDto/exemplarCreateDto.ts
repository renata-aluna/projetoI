export class ExemplarCreateDto {
    livroId: number
    quantidade: number

    constructor(livroId: number, quantidade: number) {
        this.livroId = livroId
        this.quantidade = quantidade
    }
}
