import { ExemplarEntity } from "../models/exemplarEntity"
import { LivroEntity } from "../models/livroEntity"

export class ExemplarRepository{
    private static instance: ExemplarRepository
    private exemplarLista: ExemplarEntity[]=[]

    constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new ExemplarRepository()
        }
            return this.instance
    }

    cadastraExemplar(exemplar: ExemplarEntity): void{
        this.exemplarLista.push(exemplar)
    }

    listaExemplares(): ExemplarEntity[]{
        return this.exemplarLista
    }

    buscaExemplarPorCodigo(codigo: number): ExemplarEntity | undefined{
        return this.exemplarLista.find(e => e.codigo === codigo)
    }

    atualizaExemplar(codigo: number, novosDados: ExemplarEntity){
        const index = this.exemplarLista.findIndex(e => e.codigo === codigo)
        if (index === -1) {
            throw new Error("Exemplar não encontrado!")
        }
        this.exemplarLista[index] = novosDados 
    }
    removeExemplar(codigo: number) : void {
        const index = this.exemplarLista.findIndex(e => e.codigo === codigo)
        if(index !== -1){
            this.exemplarLista.splice(index, 1)
            return
        }
         throw new Error("Exemplar não encontrado!!");
    }
    
}