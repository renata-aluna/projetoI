import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository"
import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository"
import { CursoRepository } from "../repository/cursoRepository"
import { UsuarioRepository } from "../repository/usuarioRepository"
import { LivroRepository } from "../repository/livroRepository"


const categoriaLivroRepository = CategoriaLivroRepository.getInstance()
const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance()
const cursoRepository = CursoRepository.getInstance()
const usuarioRepository = UsuarioRepository.getInstance()
const livroRepository = LivroRepository.getInstance()

export async function inicializarTabelas() {
    await categoriaLivroRepository.init()
    await categoriaUsuarioRepository.init()
    await cursoRepository.init()
    await usuarioRepository.init()
    await livroRepository.init()
}