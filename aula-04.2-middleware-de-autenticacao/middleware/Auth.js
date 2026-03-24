// MIDDLEWARE DE AUTENTICAÇÃO

import jwt from "jsonwebtoken"
import userController from "../controllers/userController.js"

// Função para verificar a autenticação do usuário
// Verificar se ele possui um token
const Authorization = (req, res, next) => {
    // Capturar o token do usuário através do cabeçalho da requisição
    const authToken = req.headers['authorization']
    //Verificando se o token existe
    if (authToken != undefined) {
        const bearerToken = authToken.split(' ')
        const token = bearerToken[1]
        // Verificando se o token é valido
        jwt.verify(token, userController.JWTSecret, (error, data) => {
            // SE O TOKEN FOR INVÁLIDO
            if (error) {
                // Cod. 401 : Não autorizado - (UNAUTHORIZED)
                res.status(401).json({ error : "Acesso não autorizado. Token inválido."})
            // SE O TOKEN FOR VÁLIDO
            } else {
                req.token = token
                req.loggedUser = {
                    id : data.id,
                    email: data.email
                }
                // Prosseguindo com a requisição
                next()
            }
        })
    // SE O TOKEN NÃO EXISTIR
    } else {
        res.status(401).json({ error : "Acesso não autorizado, você não está autenticado"})
    }
}
export default { Authorization }