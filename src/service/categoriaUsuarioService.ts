import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository"

const categoriasUsuarioRepository = CategoriaUsuarioRepository.getInstance();

export class CategoriaUsuarioService{
    listarCategoriasUsuarios(){
        return categoriasUsuarioRepository.listar()
    }
}