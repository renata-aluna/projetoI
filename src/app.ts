import express from "express"
import { UsuarioController } from "./controller/usuarioController"
import { LivroController } from "./controller/livroController"

const usuarioController = new UsuarioController()
const livroController = new LivroController()

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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}. http://localhost:3090`))