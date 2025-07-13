export class EmprestimoCreateDto {
    usuarioId: number
    estoqueId: number

    constructor(usuarioId: number, estoqueId: number) {
        this.usuarioId = usuarioId
        this.estoqueId = estoqueId
    }
}
