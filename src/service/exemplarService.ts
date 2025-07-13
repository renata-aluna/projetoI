import { ExemplarEntity } from "../models/entity/exemplarEntity";
import { ExemplarRepository } from "../repository/exemplarRepository";
import { LivroRepository } from "../repository/livroRepository";

export class ExemplarService{
    private exemplarRepository = ExemplarRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()

    async novoExemplar(data: any): Promise <ExemplarEntity>{
        if (data.livroId === undefined || data.quantidade === undefined) {
            throw new Error("Campos obrigatórios não preenchidos")
        }

        const livro = await this.livroRepository.buscaId(data.livroId)
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.")
        }
        const quantidadeEmprestada = data.quantidadeEmprestada ?? 0
        

        if(quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }

        const disponivel = data.quantidade > quantidadeEmprestada
        
        const exemplar = new ExemplarEntity(undefined, data.livroId, data.quantidade, quantidadeEmprestada, disponivel)
        
        return await this.exemplarRepository.cadastraExemplar(exemplar)
    }

    async listarExemplares(): Promise <ExemplarEntity[]>{
        return await this.exemplarRepository.listaExemplares()
    }

    async buscarExemplarPorCodigo(codigo: number):Promise <ExemplarEntity | undefined>{
        return await this.exemplarRepository.buscaExemplarPorCodigo(codigo)
    }

    async atualizarExemplar(codigo: number, data: any): Promise <void>{
        const exemplarExistente = await this.exemplarRepository.buscaExemplarPorCodigo(codigo)
        
        if(!exemplarExistente){
            throw new Error ("Exemplar não encontrado.")
        }
        if (
            data.quantidade === undefined &&
            data.disponivel === undefined &&
            data.quantidadeEmprestada === undefined &&
            data.disponivel === undefined
        ) {
            throw new Error("Nenhum campo para atualização foi fornecido");
        }

        if (data.livroId !== undefined) {
            const livro = await this.livroRepository.buscaId(data.livroId);
            if (!livro) {
                throw new Error("Livro vinculado não encontrado.");
            }
        }

        const quantidade = data.quantidade !== undefined ? data.quantidade : exemplarExistente.quantidade
        const quantidadeEmprestada = data.quantidadeEmprestada !== undefined ? data.quantidadeEmprestada : exemplarExistente.quantidadeEmprestada

        if(data.quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }
        const disponivel = data.disponivel !== undefined ? data.disponivel : (quantidade > quantidadeEmprestada)


        const livroId = data.livroId !== undefined ? data.livroId : exemplarExistente.livroId
        
        const exemplarNovo = new ExemplarEntity(exemplarExistente.codigo,livroId, quantidade, quantidadeEmprestada, disponivel)
       await this.exemplarRepository.atualizaExemplar(codigo, exemplarNovo)
    }
    async removerExemplar(codigo: number):Promise <void>{
        await this.exemplarRepository.removeExemplar(codigo)
    }

}