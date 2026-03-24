// Importando o express
import express from 'express'
// Importar o controller de usuários
import userController from '../controllers/userController.js'

// Carregar o express.Router()
const userRoutes = express.Router()


// Endpoint para CADASTRAR um usuário
userRoutes.post("/user", userController.createUser)

// endpoint para logar
userRoutes.post('/auth', userController.loginUser)

export default userRoutes