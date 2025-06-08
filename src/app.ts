import express from "express"
import { UsuarioController } from "./controller/usuarioController"

const usuarioController = new UsuarioController()
const app = express()

const PORT = process.env.PORT ?? 3090
app.use(express.json())

app.post("/library/usuarios", usuarioController.criaUsuario.bind(usuarioController))
app.get("/library/usuarios", usuarioController.buscaUsuario.bind(usuarioController))
app.get("/library/usuarios/:cpf", usuarioController.buscaUsuarioPorCpf.bind(usuarioController))
app.put("/library/usuarios/:cpf", usuarioController.atualizaUsuario.bind(usuarioController))
app.delete("/library/usuarios/:cpf", usuarioController.removeUsuario.bind(usuarioController))

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}. http://localhost:3090`))