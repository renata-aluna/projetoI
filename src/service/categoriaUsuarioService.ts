import { categoriasUsuario } from "../repository/categoriaUsuarioRepository";

export class CategoriaUsuarioService{
    listarCategoriasUsuarios(){
        return categoriasUsuario
    }
}