import { Controller, Get, Res, Route, Tags, TsoaResponse } from "tsoa"
import { CursoService } from "../service/cursoService";
import { CursoEntity } from "../models/entity/cursoEntity";
import { BasicResponseDto } from "../models/dto/basicResponseDto";

@Route("catalogos")
@Tags("cursos")
export class CursoController extends Controller {
  private cursoService = new CursoService();

  @Get("cursos")
  public async listarCursos(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const cursos: CursoEntity[] = await this.cursoService.listaCursos();
      return success(200, new BasicResponseDto("Cursos listados com sucesso!", cursos));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao listar cursos", undefined));
    }
  }
}