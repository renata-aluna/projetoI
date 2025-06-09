import express from "express"
import { UsuarioController } from "./controller/usuarioController"
import { LivroController } from "./controller/livroController"
import { ExemplarController } from "./controller/exemplarController"

const usuarioController = new UsuarioController()
const livroController = new LivroController()
const exemplarController = new ExemplarController()

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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}. http://localhost:3090`))