import express from "express"
import { RegisterRoutes } from "./route/routes"
import { setupSwagger} from "./config/swagger"
import { inicializarTabelas } from "./database/inicializador"

async function main() {
  await inicializarTabelas()

  const app = express()
  app.use(express.json())

  const PORT = 3090
  
  const apiRouter = express.Router()
  RegisterRoutes(apiRouter) 
  app.use("/library", apiRouter)

  setupSwagger(app) 

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/library`)
  })
}

main().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err)
});