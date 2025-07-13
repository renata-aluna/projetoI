import { CategoriaLivroRepository } from "../repository/categoriaLivroRepository"


const categoriaLivroRepository = CategoriaLivroRepository.getInstance();

export async function inicializarTabelas() {
    await categoriaLivroRepository.init();
}