/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/usuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/livroController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExemplarController } from './../controller/exemplarController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CursoController } from './../controller/cursoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaUsuarioController } from './../controller/categoriaUsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaLivroController } from './../controller/categoriaLivroController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UsuarioCreateDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
            "cursoId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ativo"]},{"dataType":"enum","enums":["inativo"]},{"dataType":"enum","enums":["suspenso"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string"},
            "email": {"dataType":"string"},
            "categoriaId": {"dataType":"double"},
            "cursoId": {"dataType":"double"},
            "ativo": {"ref":"Status"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroCreateDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "categoriaId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string"},
            "autor": {"dataType":"string"},
            "editora": {"dataType":"string"},
            "edicao": {"dataType":"string"},
            "categoriaId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExemplarCreateDto": {
        "dataType": "refObject",
        "properties": {
            "livroId": {"dataType":"double","required":true},
            "quantidade": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExemplarUpdateDto": {
        "dataType": "refObject",
        "properties": {
            "quantidade": {"dataType":"double"},
            "disponivel": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_criaUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UsuarioCreateDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.criaUsuario)),

            async function UsuarioController_criaUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criaUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'criaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_buscaUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.buscaUsuario)),

            async function UsuarioController_buscaUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_buscaUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'buscaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_buscaUsuarioPorCpf: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"500","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.buscaUsuarioPorCpf)),

            async function UsuarioController_buscaUsuarioPorCpf(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_buscaUsuarioPorCpf, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'buscaUsuarioPorCpf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizaUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UsuarioUpdateDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizaUsuario)),

            async function UsuarioController_atualizaUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizaUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removeUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removeUsuario)),

            async function UsuarioController_removeUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removeUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removeUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_criaLivro: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LivroCreateDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.criaLivro)),

            async function LivroController_criaLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criaLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'criaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_buscaLivro: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.buscaLivro)),

            async function LivroController_buscaLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_buscaLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'buscaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_buscaLivroPorIsbn: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"500","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.buscaLivroPorIsbn)),

            async function LivroController_buscaLivroPorIsbn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_buscaLivroPorIsbn, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'buscaLivroPorIsbn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizaLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"LivroUpdateDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizaLivro)),

            async function LivroController_atualizaLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizaLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removeLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removeLivro)),

            async function LivroController_removeLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removeLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removeLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExemplarController_criaExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                dados: {"in":"body","name":"dados","required":true,"ref":"ExemplarCreateDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/estoque',
            ...(fetchMiddlewares<RequestHandler>(ExemplarController)),
            ...(fetchMiddlewares<RequestHandler>(ExemplarController.prototype.criaExemplar)),

            async function ExemplarController_criaExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExemplarController_criaExemplar, request, response });

                const controller = new ExemplarController();

              await templateService.apiHandler({
                methodName: 'criaExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExemplarController_listaExemplares: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque',
            ...(fetchMiddlewares<RequestHandler>(ExemplarController)),
            ...(fetchMiddlewares<RequestHandler>(ExemplarController.prototype.listaExemplares)),

            async function ExemplarController_listaExemplares(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExemplarController_listaExemplares, request, response });

                const controller = new ExemplarController();

              await templateService.apiHandler({
                methodName: 'listaExemplares',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExemplarController_buscaExemplarporCodigo: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(ExemplarController)),
            ...(fetchMiddlewares<RequestHandler>(ExemplarController.prototype.buscaExemplarporCodigo)),

            async function ExemplarController_buscaExemplarporCodigo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExemplarController_buscaExemplarporCodigo, request, response });

                const controller = new ExemplarController();

              await templateService.apiHandler({
                methodName: 'buscaExemplarporCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExemplarController_atualizaExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                dados: {"in":"body","name":"dados","required":true,"ref":"ExemplarUpdateDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(ExemplarController)),
            ...(fetchMiddlewares<RequestHandler>(ExemplarController.prototype.atualizaExemplar)),

            async function ExemplarController_atualizaExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExemplarController_atualizaExemplar, request, response });

                const controller = new ExemplarController();

              await templateService.apiHandler({
                methodName: 'atualizaExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsExemplarController_removeExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(ExemplarController)),
            ...(fetchMiddlewares<RequestHandler>(ExemplarController.prototype.removeExemplar)),

            async function ExemplarController_removeExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsExemplarController_removeExemplar, request, response });

                const controller = new ExemplarController();

              await templateService.apiHandler({
                methodName: 'removeExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCursoController_listarCursos: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/cursos',
            ...(fetchMiddlewares<RequestHandler>(CursoController)),
            ...(fetchMiddlewares<RequestHandler>(CursoController.prototype.listarCursos)),

            async function CursoController_listarCursos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCursoController_listarCursos, request, response });

                const controller = new CursoController();

              await templateService.apiHandler({
                methodName: 'listarCursos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaUsuarioController_listarCategoriasUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-usuario',
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController.prototype.listarCategoriasUsuario)),

            async function CategoriaUsuarioController_listarCategoriasUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_listarCategoriasUsuario, request, response });

                const controller = new CategoriaUsuarioController();

              await templateService.apiHandler({
                methodName: 'listarCategoriasUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCategoriasLivro: Record<string, TsoaRoute.ParameterSchema> = {
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                error: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-livro',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCategoriasLivro)),

            async function CategoriaLivroController_listarCategoriasLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoriasLivro, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCategoriasLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
