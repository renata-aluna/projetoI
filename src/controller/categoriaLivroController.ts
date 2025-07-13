import { Controller, Get, Res, Route, Tags, TsoaResponse} from "tsoa"
import { CategoriaLivroService } from "../service/categoriaLivroService";
import { CategoriaLivroEntity } from "../models/entity/categoriaLivroEntity"
import { BasicResponseDto } from "../models/dto/basicResponseDto"

@Route("catalogos")
@Tags("categorias-livro")
export class CategoriaLivroController extends Controller {
  private categoriaLivroService = new CategoriaLivroService();

  @Get("categorias-livro")
  public async listarCategoriasLivro(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const categorias: CategoriaLivroEntity[] =
        await this.categoriaLivroService.listarCategoriasLivros();

      return success(200, new BasicResponseDto("Categorias de livro listadas com sucesso!", categorias));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao listar categorias", undefined));
    }
  }
}