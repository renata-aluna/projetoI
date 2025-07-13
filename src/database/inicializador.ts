import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository"
import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository";


const categoriaLivroRepository = CategoriaLivroRepository.getInstance()
const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance()


export async function inicializarTabelas() {
    await categoriaLivroRepository.init()
    await categoriaUsuarioRepository.init()
}