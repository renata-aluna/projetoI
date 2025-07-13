import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa"
import { LivroService } from "../service/livroService";
import { BasicResponseDto } from "../models/dto/basicResponseDto"
import { LivroCreateDto } from "../models/dto/livroDto/livroCreateDto"
import { LivroUpdateDto } from "../models/dto/livroDto/livroUpdateDto"

@Route("livros")
@Tags("livros")
export class LivroController extends Controller {
  private livroService = new LivroService();

  @Post()
  async criaLivro(
    @Body() body: LivroCreateDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const livro = await this.livroService.novoLivro(body);
      return success(201, new BasicResponseDto("Livro criado com sucesso!", livro));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message, null));
    }
  }

  @Get()
  async buscaLivro(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const livros = await this.livroService.buscarLivro();
      return success(200, new BasicResponseDto("Livros listados com sucesso", livros));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message, null));
    }
  }

  @Get("{isbn}")
  async buscaLivroPorIsbn(
    @Path() isbn: string,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<404, BasicResponseDto>,
    @Res() error: TsoaResponse<500, BasicResponseDto>
  ) {
    try {
      const livro = await this.livroService.buscarLivroPorIsbn(isbn);
      if (!livro) {
        return notFound(404, new BasicResponseDto("ISBN inválido ou inexistente.", null));
      }
      return success(200, new BasicResponseDto("Livro encontrado", livro));
    } catch (err: any) {
      return error(500, new BasicResponseDto(err.message, null));
    }
  }

  @Put("{isbn}")
  async atualizaLivro(
    @Path() isbn: string,
    @Body() body: LivroUpdateDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const atualizado = await this.livroService.atualizarLivro(isbn, body);
      return success(200, new BasicResponseDto("Livro atualizado com sucesso", atualizado));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message, null));
    }
  }

  @Delete("{isbn}")
  async removeLivro(
    @Path() isbn: string,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      await this.livroService.removerLivro(isbn);
      return success(200, new BasicResponseDto("Livro removido com sucesso", null));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message, null));
    }
  }
}