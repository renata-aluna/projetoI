import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa"
import { UsuarioService } from "../service/usuarioService"
import { BasicResponseDto } from "../models/dto/basicResponseDto"
import { UsuarioEntity } from "../models/entity/usuarioEntity"
import { UsuarioCreateDto } from "../models/dto/usuarioDto/usuarioCreateDto"
import { UsuarioUpdateDto } from "../models/dto/usuarioDto/usuarioUpdateDto"

@Route("usuarios")
@Tags("usuarios")
export class UsuarioController extends Controller {
  private usuarioService = new UsuarioService();

  @Post()
  public async criaUsuario(
    @Body() body: UsuarioCreateDto,
    @Res() success: TsoaResponse<201, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      await this.usuarioService.novoUsuario(body);
      return success(201, new BasicResponseDto("Usuário criado com sucesso!", null));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao criar usuário", null));
    }
  }

  @Get()
  public async buscaUsuario(
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const usuarios = await this.usuarioService.buscarUsuarios();
      return success(200, new BasicResponseDto("Usuários listados com sucesso!", usuarios));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao listar usuários", null));
    }
  }

  @Get("{cpf}")
  public async buscaUsuarioPorCpf(
    @Path() cpf: string,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<404, BasicResponseDto>,
    @Res() error: TsoaResponse<500, BasicResponseDto>
  ) {
    try {
      const usuario = await this.usuarioService.buscarUsuarioPorCpf(cpf);
      if (!usuario) {
        return notFound(404, new BasicResponseDto("CPF inválido ou inexistente", null));
      }
      return success(200, new BasicResponseDto("Usuário encontrado!", usuario));
    } catch (err: any) {
      return error(500, new BasicResponseDto(err.message || "Erro ao buscar usuário", null));
    }
  }

  @Put("{cpf}")
  public async atualizaUsuario(
    @Path() cpf: string,
    @Body() body: UsuarioUpdateDto,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizarUsuario(cpf, body);
      return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", usuarioAtualizado));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao atualizar usuário", null));
    }
  }

  @Delete("{cpf}")
  public async removeUsuario(
    @Path() cpf: string,
    @Res() success: TsoaResponse<200, BasicResponseDto>,
    @Res() error: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      await this.usuarioService.removerUsuario(cpf);
      return success(200, new BasicResponseDto("Usuário removido com sucesso", null));
    } catch (err: any) {
      return error(400, new BasicResponseDto(err.message || "Erro ao remover usuário", null));
    }
  }
}