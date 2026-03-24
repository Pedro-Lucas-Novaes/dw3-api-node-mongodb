// Importando o service
import userService from "../services/userService.js";
// importando JWT para criar token
import jwt from 'jsonwebtoken' 

// segredo (geralmente em .env) para gerar token
const JWTSecret = 'thegames-secret' 

// Função para CADASTRAR um usuário
const createUser = async(req, res) => {
    try {
        // Coletando os dados
        const { name, email, password } = req.body
        // Enviando para casdastrar
        await userService.Create(name, email, password)
        // Retornando uma resposta
        res.status(201).json({ message: 'Usuário cadastrado com sucesso! '})
        // Cod. 201 (CREATE)
    } catch (error) {
        console.log(error)
        res.status(500)({ error: 'Não foi possível cadastrar o usuário. Error interno do servidor.'})
    }
}

// função para autenticar um usuário (login)
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        // se o e-mail existe
        if(email != undefined){
            // busca usuário no banco
            const user = await userService.getOne(email)
            // se o usuário for encontrado
            if(user != undefined){
                // verifica se a senha está correta
                if(user.password == password){
                    // concede token de autenticação com dados personalizados + secredo + tempo de expiração
                    jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn: '48h'}, 
                        // verifica se ocorreu erro ou, se bem-sucedido, grava token
                        (error, token) => {
                            if(error){
                                res.status(400).json({error: "Não foi possível gerar o token de autenticação."})
                            } else {
                                res.status(200).json({message: "Login realizado com sucesso!", token: token})
                            }
                    })
                } else{
                    // se a senha estiver incorreta -> cod 401 (unauthorized)
                    res.status(401).json({error: "Suas credenciais são inválidas. Verifique e tente novamente."})
                }
            } else {
                // se o usuário não foi encontrado -> cod 404 (not found)
                res.status(404).json({error: "Usuário não encontrado. Verifique e tente novamente."})
            }
        } else {
            // e-mail não encontrado
            res.status(404).json({error: "E-mail inválido ou vazio."})
        }       
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Não foi possível realizar o login. Erro interno do servidor."})
    }
}


export default { createUser, loginUser, JWTSecret }