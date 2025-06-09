import { cursos } from "../repository/cursoRepository";

export class CursoService{
    listaCursos(){
        return cursos
    }
}