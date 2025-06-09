import { ExemplarEntity } from "../models/exemplarEntity";
import { ExemplarRepository } from "../repository/exemplarRepository";

export class ExemplarService{
    private exemplarRepository = ExemplarRepository.getInstance()

    novoExemplar(data: any): ExemplarEntity{
        if(!data.livroId || !data.quantidade || data.disponivel === undefined){
            throw new Error("Campos obrigatórios não preenchidos")    
        }
        const quantidadeEmprestada = data.quantidadeEmprestada || 0;

        if(data.quantidade < 0 || quantidadeEmprestada < 0){
            throw new Error("Quantidades não podem ser negativas")
        }
        if(quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }
        const exemplar = new ExemplarEntity(undefined, data.livroId, data.quantidade, quantidadeEmprestada, data.disponivel)
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
        if(!data.livroId || !data.quantidade || !data.quantidadeEmprestada || !data.disponivel){
            throw new Error("Campos obrigatórios não preenchidos")    
        }
        if(!exemplarExistente){
            throw new Error ("Exemplar não encontrado.")
        }
        const exemplarNovo = new ExemplarEntity(exemplarExistente.codigo,data.livroId, data.quantidade, data.quantidadeEmprestada, data.disponivel )
        return this.exemplarRepository.atualizaExemplar(codigo, exemplarNovo)
    }
    removerExemplar(codigo: number){
        this.exemplarRepository.removeExemplar(codigo)
    }

}