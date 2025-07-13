import { CursoRepository } from "../repository/cursoRepository"

const cursoRepository = CursoRepository.getInstance()

export class CursoService{
    listaCursos(){
        return cursoRepository.listar()
    }
}