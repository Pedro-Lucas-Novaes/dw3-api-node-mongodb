// Importando o service
import userService from "../services/userService.js";

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
export default { createUser }