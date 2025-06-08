export type Status = "ativo" | "inativo" | "suspenso"

export class UsuarioEntity {
  id: number
  nome: string
  cpf: string
  email: string
  ativo: Status
  categoriaId: number
  cursoId: number

  constructor(id: number | undefined, nome: string, cpf: string, email:string, ativo: Status, categoriaId: number, cursoId: number){
    this.id = id ?? this.gerarId()
    this.nome = nome
    this.cpf = cpf
    this.email = email
    this.ativo = ativo
    this.categoriaId = categoriaId
    this.cursoId = cursoId
  }

  private gerarId(): number {
    return parseInt((Date.now() / 100).toString(), 10)
  }
}