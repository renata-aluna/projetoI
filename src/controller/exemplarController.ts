import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa"
import { ExemplarService } from "../service/exemplarService";
import { BasicResponseDto } from "../models/dto/basicResponseDto";
import { ExemplarCreateDto } from "../models/dto/exemplarDto/exemplarCreateDto";
import { ExemplarUpdateDto } from "../models/dto/exemplarDto/exemplarUpdateDto";

@Route("estoque")
@Tags("exemplares")
export class ExemplarController extends Controller {
  private exemplarService = new ExemplarService();

  @Post()
  public async criaExemplar(
    @Body() dados: ExemplarCreateDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const exemplar = await this.exemplarService.novoExemplar(dados);
      return success(201, new BasicResponseDto("Exemplar criado com sucesso!", exemplar));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao criar exemplar", null));
    }
  }

  @Get()
  public async listaExemplares(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const exemplares = await this.exemplarService.listarExemplares();
      return success(200, new BasicResponseDto("Exemplares listados com sucesso!", exemplares));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao listar exemplares", null));
    }
  }

  @Get("{codigo}")
  public async buscaExemplarporCodigo(
    @Path() codigo: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<404, BasicResponseDto>
  ) {
    try {
      const exemplar = await this.exemplarService.buscarExemplarPorCodigo(codigo);
      if (!exemplar) {
        return notFound(404, new BasicResponseDto("Código inválido ou inexistente.", null));
      }
      return success(200, new BasicResponseDto("Exemplar encontrado com sucesso!", exemplar));
    } catch (err: any) {
      return notFound(404, new BasicResponseDto(err.message || "Erro ao buscar exemplar", null));
    }
  }

  @Put("{codigo}")
  public async atualizaExemplar(
    @Path() codigo: number,
    @Body() dados: ExemplarUpdateDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const exemplar = await this.exemplarService.atualizarExemplar(codigo, dados);
      return success(200, new BasicResponseDto("Exemplar atualizado com sucesso", exemplar));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao atualizar exemplar", null));
    }
  }

  @Delete("{codigo}")
  public async removeExemplar(
    @Path() codigo: number,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      await this.exemplarService.removerExemplar(codigo);
      return success(200, new BasicResponseDto("Exemplar removido com sucesso!", null));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao remover exemplar", null));
    }
  }
}