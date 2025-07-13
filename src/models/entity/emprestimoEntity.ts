export class EmprestimoEntity {
    id: number
    usuarioId: number
    estoqueId: number
    dataEmprestimo: Date
    dataDevolucao: Date
    dataEntrega: Date | null
    diasAtraso: number
    suspensaoAte: Date | null

    constructor(id: number | undefined, usuarioId: number, estoqueId: number, dataEmprestimo: Date, dataDevolucao: Date, dataEntrega: Date | null = null, diasAtraso: number = 0,suspensaoAte: Date | null = null) {
        this.id = id ?? this.gerarId()
        this.usuarioId = usuarioId
        this.estoqueId = estoqueId
        this.dataEmprestimo = dataEmprestimo
        this.dataDevolucao = dataDevolucao
        this.dataEntrega = dataEntrega
        this.diasAtraso = diasAtraso
        this.suspensaoAte = suspensaoAte
    }

    private gerarId(): number {
        return parseInt((Date.now() / 100).toString(), 10)
    }
}