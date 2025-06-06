export class UsuarioEntity {
  id: number
  nome: string
  cpf: string
  ativo: boolean
  categoria_Id: number
  curso_Id: number

  constructor(id: number | undefined, nome: string, cpf: string, ativo: boolean, categoria_Id: number, curso_Id: number){
    this.id = id ?? this.gerarId()
    this.nome = nome
    this.cpf = cpf
    this.ativo = ativo
    this.categoria_Id = categoria_Id
    this.curso_Id = curso_Id
  }

  private gerarId(): number {
    return parseInt((Date.now() / 100).toString(), 10)
  }
}