export class ExemplarUpdateDto {
    quantidade?: number
    disponivel?: boolean

    constructor(quantidade?: number, disponivel?: boolean) {
        this.quantidade = quantidade
        this.disponivel = disponivel
    }
}