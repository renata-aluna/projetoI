import express from "express"
import { UsuarioController } from "./controller/usuarioController"
import { LivroController } from "./controller/livroController"
import { ExemplarController } from "./controller/exemplarController"
import { CategoriaUsuarioController } from "./controller/categoriaUsuarioController"
import { CategoriaLivroController } from "./controller/categoriaLivroController"
import { CursoController } from "./controller/cursoController"
import { EmprestimoController } from "./controller/emprestimoController"

const usuarioController = new UsuarioController()
const livroController = new LivroController()
const exemplarController = new ExemplarController()
const emprestimoController = new EmprestimoController()
const categoriaUsuarioController = new CategoriaUsuarioController()
const categoriaLivroController = new CategoriaLivroController()
const cursoController =new CursoController()


const app = express()

const PORT = process.env.PORT ?? 3090
app.use(express.json())

app.post("/library/usuarios", usuarioController.criaUsuario.bind(usuarioController))
app.get("/library/usuarios", usuarioController.buscaUsuario.bind(usuarioController))
app.get("/library/usuarios/:cpf", usuarioController.buscaUsuarioPorCpf.bind(usuarioController))
app.put("/library/usuarios/:cpf", usuarioController.atualizaUsuario.bind(usuarioController))
app.delete("/library/usuarios/:cpf", usuarioController.removeUsuario.bind(usuarioController))

app.post("/library/livros", livroController.criaLivro.bind(livroController))
app.get("/library/livros", livroController.buscaLivro.bind(livroController))
app.get("/library/livros/:isbn", livroController.buscaLivroPorIsbn.bind(livroController))
app.put("/library/livros/:isbn", livroController.atualizaLivro.bind(livroController))
app.delete("/library/livros/:isbn", livroController.removeLivro.bind(livroController))

app.post("/library/estoque", exemplarController.criaExemplar.bind(exemplarController))
app.get("/library/estoque", exemplarController.listaExemplares.bind(exemplarController))
app.get("/library/estoque/:codigo", exemplarController.buscaExemplarporCodigo.bind(exemplarController))
app.put("/library/estoque/:codigo", exemplarController.atualizaExemplar.bind(exemplarController))
app.delete("/library/estoque/:codigo", exemplarController.removeExemplar.bind(exemplarController))

app.post("/library/emprestimos", emprestimoController.cadastrarEmprestimo.bind(emprestimoController))
app.get("/library/emprestimos", emprestimoController.listaEmprestimo.bind(emprestimoController))
app.put("/library/emprestimos/:id/devolucao", emprestimoController.DevolveEmprestimo.bind(emprestimoController))
app.put("/library/emprestimos/verificar-suspensoes", emprestimoController.verificarSuspensoesAutomaticas.bind(emprestimoController));

app.get("/library/catalogos/categorias-usuario", categoriaUsuarioController.listaCategoriasUsuario.bind(categoriaUsuarioController))
app.get("/library/catalogos/categorias-livro", categoriaLivroController.listaCategoriasLivro.bind(categoriaLivroController))
app.get("/library/catalogos/cursos", cursoController.listarCursos.bind(cursoController))



app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}. http://localhost:3090`))