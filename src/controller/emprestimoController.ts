import { Body, Controller, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa"
import { EmprestimoService } from "../service/emprestimoService";
import { EmprestimoCreateDto } from "../models/dto/emprestimoDto/emprestimoCreateDto"
import { EmprestimoDevolucaoDto } from "../models/dto/emprestimoDto/emprestimoDevDto"
import { BasicResponseDto } from "../models/dto/basicResponseDto"

@Route("emprestimos")
@Tags("Emprestimos")
export class EmprestimoController extends Controller {
    private emprestimoService = new EmprestimoService();

    @Post()
    public async cadastrarEmprestimo(
        @Body() body: EmprestimoCreateDto,
        @Res() createdResponse: TsoaResponse<201, BasicResponseDto>,
        @Res() badRequestResponse: TsoaResponse<400, BasicResponseDto>,
        @Res() conflictResponse: TsoaResponse<409, BasicResponseDto>
    ) {
        try {
            const emprestimo = await this.emprestimoService.novoEmprestimo(body)
            return createdResponse(201, new BasicResponseDto("Empréstimo cadastrado com sucesso", emprestimo))
        } catch (error: any) {
            if (error.message.includes("já existe")) {
                return conflictResponse(409, new BasicResponseDto(error.message, undefined));
            }
            return badRequestResponse(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    public async listarEmprestimos(
        @Res() successResponse: TsoaResponse<200, BasicResponseDto>,
        @Res() errorResponse: TsoaResponse<500, BasicResponseDto>
    ) {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimo()
            return successResponse(200, new BasicResponseDto("Lista de empréstimos recuperada com sucesso", emprestimos))
        } catch (error: any) {
        return errorResponse(500, new BasicResponseDto(error.message, undefined))
        }
    }

    @Put("{id}/devolucao")
    public async realizarDevolucao(
        @Path() id: number,
        @Body() body: EmprestimoDevolucaoDto,
        @Res() successResponse: TsoaResponse<200, BasicResponseDto>,
        @Res() notFoundResponse: TsoaResponse<404, BasicResponseDto>,
        @Res() badRequestResponse: TsoaResponse<400, BasicResponseDto>,
        @Res() conflictResponse: TsoaResponse<409, BasicResponseDto>
    ) {
        try {
            const emprestimo = await this.emprestimoService.realizarDevolucao(id, {
                dataEntrega: body.dataEntrega?.toISOString() || new Date().toISOString()
            });
            return successResponse(200, new BasicResponseDto(
                "Devolução registrada com sucesso",
                emprestimo
            ));
        } catch (error: any) {
            if (error.message.includes("não encontrado")) {
                return notFoundResponse(404, new BasicResponseDto(error.message, undefined))
            }
            if (error.message.includes("já foi devolvido")) {
                return conflictResponse(409, new BasicResponseDto(error.message, undefined))
            }
            return badRequestResponse(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Post("verificar-suspensoes")
    public async verificarSuspensoesAutomaticas(
        @Res() successResponse: TsoaResponse<200, BasicResponseDto>,
        @Res() errorResponse: TsoaResponse<500, BasicResponseDto>
    ) {
        try {
            await this.emprestimoService.validarSuspensoesAutomaticasEmLote();
            return successResponse(200, new BasicResponseDto(
                "Verificação de suspensões automáticas concluída",
                undefined
            ));
        } catch (error: any) {
            return errorResponse(500, new BasicResponseDto(
                "Erro ao verificar suspensões: " + error.message,
                undefined
            ));
        }
    }
}