import { EmprestimoEntity } from "../models/entity/emprestimoEntity";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimoLista: EmprestimoEntity[] = [];
    
    constructor() {}

    static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    cadastraEmprestimo(emprestimo: EmprestimoEntity){
        this.emprestimoLista.push(emprestimo)
    }

    listaEmprestimos(): EmprestimoEntity[]{
        return this.emprestimoLista
    }

    atualizaEmprestimo(id: number, novoEmprestimo: EmprestimoEntity){
        const index = this.emprestimoLista.findIndex(e => e.id === id)
        if (index === -1){
            throw new Error ("Empréstimo não encontrado")
        }
        this.emprestimoLista[index] = novoEmprestimo
    }
}