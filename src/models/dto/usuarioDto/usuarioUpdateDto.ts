import {Status} from '../../entity/usuarioEntity';


export class UsuarioUpdateDto {
    nome?: string
    email?: string
    categoriaId?: number
    cursoId?: number
    ativo?: Status

    constructor(nome?: string, email?: string, categoriaId?: number, cursoId?: number, ativo?: Status) {
        this.nome = nome
        this.email = email
        this.categoriaId = categoriaId
        this.cursoId = cursoId
        this.ativo = ativo
    }
}
