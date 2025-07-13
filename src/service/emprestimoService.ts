    import { EmprestimoEntity } from "../models/entity/emprestimoEntity";
    import { CategoriaUsuarioRepository } from "../repository/categoriaUsuarioRepository";
    import { EmprestimoRepository } from "../repository/emprestimoRepository";
    import { ExemplarRepository } from "../repository/exemplarRepository";
    import { LivroRepository } from "../repository/livroRepository";
    import { UsuarioRepository } from "../repository/usuarioRepository";

    export class EmprestimoService{
        private emprestimoRepository = EmprestimoRepository.getInstance()
        private usuarioRepository = UsuarioRepository.getInstance()
        private livroRepository = LivroRepository.getInstance()
        private exemplarRepository = ExemplarRepository.getInstance()
        private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance()

        async novoEmprestimo(data: any): Promise<EmprestimoEntity>{
            if (!data.usuarioId  || !data.dataEmprestimo) {
                throw new Error("Dados obrigatórios do empréstimo ausentes.")
            }

            const usuario = this.usuarioRepository.buscaId(data.usuarioId)
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

            const categorias = await this.categoriaUsuarioRepository.listar();
            const categoria = categorias.find(c => c.id === usuario.categoriaId);
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
                diasEmprestimo = livro.categoriaId === usuario.categoriaId ? 30 : 15;
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

            exemplar.quantidadeEmprestada++;
            exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
            this.exemplarRepository.atualizaExemplar(data.estoqueId, exemplar);

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

            emprestimo.dataEntrega = dataDev;

            const diasAtraso = this.tempoAtraso(emprestimo);

            this.colocarSuspensao(emprestimo, diasAtraso);

            const exemplar = this.exemplarRepository.buscaExemplarPorCodigo(emprestimo.estoqueId);
            if (exemplar) {
                exemplar.quantidadeEmprestada--;
                exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
                this.exemplarRepository.atualizaExemplar(emprestimo.estoqueId, exemplar);
            }

            return emprestimo;
        }

        private tempoAtraso(emprestimo: EmprestimoEntity): number {
            const devolucao = new Date(emprestimo.dataDevolucao)
            const entrega = emprestimo.dataEntrega
            if (!entrega) {
                throw new Error("Data de entrega não encontrada")
            }

            const atraso = entrega.getTime() - devolucao.getTime()
            const diasAtraso = Math.max(Math.ceil(atraso / (1000 * 60 * 60 * 24)), 0)
            emprestimo.diasAtraso = diasAtraso
            return diasAtraso
        }

        private colocarSuspensao(emprestimo: EmprestimoEntity, diasAtraso: number): void {
            if (diasAtraso > 0) {
                const entrega = emprestimo.dataEntrega
            
                if (!entrega) {
                    throw new Error("Data de entrega inválida!!!");
                }

                const suspensaoDias = diasAtraso * 3;
                const suspensao = new Date(entrega.getTime() + suspensaoDias * 86400000);

                emprestimo.suspensaoAte = suspensao;

                const usuario = this.usuarioRepository.buscaId(emprestimo.usuarioId);
                
                if (usuario) {
                    if (suspensaoDias > 60) {
                        usuario.ativo = "suspenso";
                } else {
                    const emprestimosUsuario = this.emprestimoRepository.listaEmprestimos().filter((e) => e.usuarioId == usuario.id && e.suspensaoAte && new Date(e.suspensaoAte) > new Date());

                    if (emprestimosUsuario.length > 2) {
                        usuario.ativo = "inativo";
                    }
                }
                this.usuarioRepository.atualizaUsuario(usuario.cpf, usuario);
                }
            }
        }

         public validarSuspensoesAutomaticasEmLote(loteTamanho: number = 1000): void {
            const emprestimos = this.emprestimoRepository.listaEmprestimos()
            const emprestimosAbertos = emprestimos.filter(e => !e.dataEntrega)

            for (let i = 0; i < emprestimosAbertos.length; i += loteTamanho) {
                const lote = emprestimosAbertos.slice(i, i + loteTamanho)

                lote.forEach((emprestimo) => {
                    const hoje = new Date()
                    const dataDevolucao = new Date(emprestimo.dataDevolucao)

                    if (hoje > dataDevolucao) {
                        const diasAtraso = Math.ceil((hoje.getTime() - dataDevolucao.getTime()) / (1000 * 60 * 60 * 24))
                        emprestimo.dataEntrega = hoje
                        this.colocarSuspensao(emprestimo, diasAtraso)
                        this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo)
                    }
                })
            }
        }

    
}