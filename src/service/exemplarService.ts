import { ExemplarEntity } from "../models/entity/exemplarEntity";
import { ExemplarRepository } from "../repository/exemplarRepository";
import { LivroRepository } from "../repository/livroRepository";

export class ExemplarService{
    private exemplarRepository = ExemplarRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()

    novoExemplar(data: any): ExemplarEntity{
        if (data.livroId === undefined || data.quantidade === undefined || data.quantidadeEmprestada === undefined) {
            throw new Error("Campos obrigatórios não preenchidos");
        }

        const livro = this.livroRepository.buscaId(data.livroId);
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.");
        }

        if(data.quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }

        const disponivel = data.quantidade > data.quantidadeEmprestada;
        
        const exemplar = new ExemplarEntity(undefined, data.livroId, data.quantidade, data.quantidadeEmprestada, disponivel)
        
        this.exemplarRepository.cadastraExemplar(exemplar)
        
        return exemplar
    }

    listarExemplares(): ExemplarEntity[]{
        return this.exemplarRepository.listaExemplares()
    }

    buscarExemplarPorCodigo(codigo: number): ExemplarEntity | undefined{
        return this.exemplarRepository.buscaExemplarPorCodigo(codigo)
    }

    atualizarExemplar(codigo: number, data: any){
        const exemplarExistente = this.exemplarRepository.buscaExemplarPorCodigo(codigo)

        if (data.livroId === undefined || data.quantidade === undefined || data.quantidadeEmprestada === undefined) {
            throw new Error("Campos obrigatórios não preenchidos");
        }

        if(!exemplarExistente){
            throw new Error ("Exemplar não encontrado.")
        }

        const livro = this.livroRepository.buscaId(data.livroId);
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.");
        }

        if(data.quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }

        const disponivel = data.quantidade > data.quantidadeEmprestada;
        
        const exemplarNovo = new ExemplarEntity(exemplarExistente.codigo,data.livroId, data.quantidade, data.quantidadeEmprestada, disponivel)
        return this.exemplarRepository.atualizaExemplar(codigo, exemplarNovo)
    }
    removerExemplar(codigo: number){
        this.exemplarRepository.removeExemplar(codigo)
    }

}