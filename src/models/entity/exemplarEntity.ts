    export class ExemplarEntity{
        codigo: number
        livroId: number
        quantidade: number
        quantidadeEmprestada: number
        disponivel: boolean
        
        constructor(codigo: number | undefined, livroId: number, quantidade: number, quantidadeEmprestada: number, disponivel: boolean){
            this.codigo = codigo ?? this.gerarCodigo()
            this.livroId = livroId
            this.quantidade = quantidade
            this.quantidadeEmprestada = quantidadeEmprestada
            this.disponivel = disponivel
        }

        private gerarCodigo(): number {
            return parseInt((Date.now() / 100).toString(), 10);
        }
    }