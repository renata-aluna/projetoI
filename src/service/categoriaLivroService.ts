import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository"

const categoriaLivroRepository = CategoriaLivroRepository.getInstance()

export class CategoriaLivroService {
    listarCategoriasLivros() {
       return categoriaLivroRepository.listar()
    }

}