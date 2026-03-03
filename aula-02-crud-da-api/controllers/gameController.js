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
        res.status(500).json({error : 'Erro interno do servidor. Não foi possivel listar os jogos.'})
    }
}

// Função para tratar a requisição de CADASTRAR um jogo
const CreateGame = async(req, res) => {
    try{
        // DESESTRUTURAÇÃO
        // const title
        // const plataform
        // COLETANDO OS DADOS DO CORPO DA REQUISIÇÃO
        const {title, platform, year, price} = req.body
        await gameService.Create(title, platform, year, price)
        res.status(201).json({message: 'O jogo foi cadastrado com sucesso!'})
        // Cod. 201 - CREATED - Um novo recurso foi criado no servidor.

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor. Não foi possivel cadastrar o jogo.'})
    }
}
export default { getAllGames, CreateGame }