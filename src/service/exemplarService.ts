import { ExemplarEntity } from "../models/entity/exemplarEntity";
import { ExemplarRepository } from "../repository/exemplarRepository";
import { LivroRepository } from "../repository/livroRepository";

export class ExemplarService{
    private exemplarRepository = ExemplarRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()

    async novoExemplar(data: any): Promise <ExemplarEntity>{
        if (data.livroId === undefined || data.quantidade === undefined || data.quantidadeEmprestada === undefined) {
            throw new Error("Campos obrigatórios não preenchidos")
        }

        const livro = this.livroRepository.buscaId(data.livroId)
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.")
        }

        if(data.quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }

        const disponivel = data.quantidade > data.quantidadeEmprestada
        
        const exemplar = new ExemplarEntity(undefined, data.livroId, data.quantidade, data.quantidadeEmprestada, disponivel)
        
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

        if (data.livroId === undefined || data.quantidade === undefined || data.quantidadeEmprestada === undefined) {
            throw new Error("Campos obrigatórios não preenchidos")
        }

        if(!exemplarExistente){
            throw new Error ("Exemplar não encontrado.")
        }

        const livro = await this.livroRepository.buscaId(data.livroId);
        if (!livro) {
            throw new Error("Livro vinculado não encontrado.");
        }

        if(data.quantidadeEmprestada > data.quantidade){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total")
        }

        const disponivel = data.quantidade > data.quantidadeEmprestada;
        
        const exemplarNovo = new ExemplarEntity(exemplarExistente.codigo,data.livroId, data.quantidade, data.quantidadeEmprestada, disponivel)
       await this.exemplarRepository.atualizaExemplar(codigo, exemplarNovo)
    }
    async removerExemplar(codigo: number):Promise <void>{
        await this.exemplarRepository.removeExemplar(codigo)
    }

}