export class UsuarioCreateDto {
    nome: string
    cpf: string
    email: string
    categoriaId: number
    cursoId: number

    constructor(nome: string, cpf: string, email: string, categoriaId: number, cursoId: number) {
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.categoriaId = categoriaId
        this.cursoId = cursoId
    }
}
