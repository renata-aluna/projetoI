import { Controller, Get, Res, Route, Tags, TsoaResponse } from "tsoa"
import { CategoriaUsuarioService } from "../service/categoriaUsuarioService";
import { CategoriaUsuarioEntity } from "../models/entity/categoriaUsuarioEntity"
import { BasicResponseDto } from "../models/dto/basicResponseDto"

@Route("catalogos")
@Tags("categorias-usuario")
export class CategoriaUsuarioController extends Controller {
  private categoriaUsuarioService = new CategoriaUsuarioService()

  @Get("categorias-usuario")
  public async listarCategoriasUsuario(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const categorias: CategoriaUsuarioEntity[] =
        await this.categoriaUsuarioService.listarCategoriasUsuarios()

      return success(
        200,
        new BasicResponseDto("Categorias de usuário listadas com sucesso!", categorias)
      )
    } catch (err: any) {
      return error(
        400,
        new BasicResponseDto(err.message || "Erro ao listar categorias", undefined)
      )
    }
  }
}