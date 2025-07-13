import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository"
import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository"
import { CursoRepository } from "../repository/cursoRepository"



const categoriaLivroRepository = CategoriaLivroRepository.getInstance()
const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance()
const cursoRepository = CursoRepository.getInstance()


export async function inicializarTabelas() {
    await categoriaLivroRepository.init()
    await categoriaUsuarioRepository.init()
    await cursoRepository.init()

}