// Importando o Service
import gameService from "../services/gameService.js";

// Função para tratar a requisição de LISTAR os jogos
const getAllGames = async (req, res) => {
    try{
        const games = await gameService.getAll()
        res.status(200).json({ games : games })
        // Cod. 200 (OK) : Requisição Feita com sucesso
    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor.'})
    }
}

export default { getAllGames }