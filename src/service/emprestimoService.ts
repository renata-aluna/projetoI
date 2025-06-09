import { EmprestimoEntity } from "../models/emprestimoEntity";
import { categoriasUsuario } from "../repository/categoriaUsuarioRepository";
import { EmprestimoRepository } from "../repository/emprestimoRepository";
import { ExemplarRepository } from "../repository/exemplarRepository";
import { LivroRepository } from "../repository/livroRepository";
import { UsuarioRepository } from "../repository/usuarioRepository";

export class EmprestimoService{
    private emprestimoRepository = EmprestimoRepository.getInstance()
    private usuarioRepository = UsuarioRepository.getInstance()
    private livroRepository = LivroRepository.getInstance()
    private exemplarRepository = ExemplarRepository.getInstance()

    novoEmprestimo(data: any): EmprestimoEntity{
        if (!data.usuarioId  || !data.dataEmprestimo) {
            throw new Error("Dados obrigatórios do empréstimo ausentes.")
        }

        const usuario = this.usuarioRepository.buscaId(data.usuarioId)
        if (!usuario) {
            throw new Error("Usuário não encontrado.")
        }

        if (!usuario || usuario.ativo !== "ativo") {
            throw new Error("Usuário inativo/suspenso ou inexistente");
        }

        const exemplar = this.exemplarRepository.buscaExemplarPorCodigo(data.estoqueId);
        if (!exemplar) {
            throw new Error("Exemplar não existe");
        }

        if(exemplar.quantidade <= exemplar.quantidadeEmprestada){
            throw new Error("Exemplar não disponível para empréstimos")
        }

        const livro = this.livroRepository.buscaId(exemplar.livroId)
        if (!livro) {
        throw new Error("Livro não encontrado.")
        }

        const categoria = categoriasUsuario.find(c => c.id === usuario.categoriaId);
        if (!categoria) {
            throw new Error("Categoria do usuário não encontrada.");
        }

        let limiteLivros = 0;
        let diasEmprestimo = 0;

        if (categoria.nome === "Professor") {
            limiteLivros = 5;
            diasEmprestimo = 40;
        } else if (categoria.nome === "Aluno") {
            limiteLivros = 3;
            diasEmprestimo = livro.categoriaId === usuario.cursoId ? 30 : 15;
        } else {
            throw new Error("Categoria não permitida para empréstimo");
        }

        const emprestimosAtivos = this.emprestimoRepository.listaEmprestimos().filter(e => e.usuarioId === data.usuarioId && !e.dataEntrega);

        if (emprestimosAtivos.length >= limiteLivros) {
        throw new Error("Limite de empréstimos atingido");
        }

        const dataEmp = new Date(data.dataEmprestimo);
        const dataPrevista = new Date(dataEmp.getTime() + diasEmprestimo * 86400000)

        const emprestimo = new EmprestimoEntity(undefined, data.usuarioId, data.estoqueId, data.dataEmprestimo, dataPrevista, null, 0, null);

        this.emprestimoRepository.cadastraEmprestimo(emprestimo);

        return emprestimo;
    }

    listarEmprestimo(): EmprestimoEntity[]{
        return this.emprestimoRepository.listaEmprestimos()
    }

    realizarDevolucao(idEmprestimo: number, data: any): EmprestimoEntity {
        const emprestimo = this.emprestimoRepository.listaEmprestimos()
            .find(e => e.id === idEmprestimo);

        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }

        if (emprestimo.dataEntrega) {
            throw new Error("Empréstimo já foi devolvido.");
        }

        const dataDev = new Date(data.dataEntrega); 
        const dataPrevista = new Date(emprestimo.dataDevolucao);

        let diasAtraso = 0;
        let suspensaoAte: Date | null = null;

        if (dataDev > dataPrevista) {
            const diff = Math.ceil((dataDev.getTime() - dataPrevista.getTime()) / 86400000);
            diasAtraso = diff;
            suspensaoAte = new Date(dataDev.getTime() + diff * 2 * 86400000); 
        }

        emprestimo.dataEntrega = dataDev;
        emprestimo.diasAtraso = diasAtraso;
        emprestimo.suspensaoAte = suspensaoAte;

        const exemplar = this.exemplarRepository.buscaExemplarPorCodigo(emprestimo.estoqueId);
        if (exemplar) {
            exemplar.quantidadeEmprestada--;
        }

        return emprestimo;
    }
}