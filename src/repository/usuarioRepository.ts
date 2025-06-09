import { UsuarioEntity } from "../models/usuarioEntity"

export class UsuarioRepository{
    private static instance: UsuarioRepository
    private usuarioLista: UsuarioEntity[] = [] 

    constructor(){}

    static getInstance(){
        if (!this.instance){
            this.instance = new UsuarioRepository()
        }
            return this.instance
    }

    cadastraUsuario(usuario: UsuarioEntity): void{
        this.usuarioLista.push(usuario) 
    }

    listaUsuarios(): UsuarioEntity[]{
        return this.usuarioLista
    }

    buscaCpf(cpf:string): UsuarioEntity | undefined{
        return this.usuarioLista.find(u => u.cpf === cpf)
    }

    buscaId(id:number): UsuarioEntity | undefined{
        return this.usuarioLista.find(u => u.id === id)
    }

    atualizaUsuario(cpf: string, novosDados: UsuarioEntity) {
        const index = this.usuarioLista.findIndex(u => u.cpf === cpf)
        if (index === -1) {
            throw new Error("Usuário não encontrado!")
        }
         this.usuarioLista[index] = novosDados  
    }

    removeUsuario(cpf: string) : void {
        const index = this.usuarioLista.findIndex(u => u.cpf === cpf)
        if(index !== -1){
            this.usuarioLista.splice(index, 1)
            return
        }
         throw new Error("Usuário não encontrado!!");
    }
}
