// Importando o Model
import Game from "../models/Games.js"

class gameService {
    // funções asincronas são não bloqueantes
    async getAll(){
        // Try trata o sucesso
        try{

            // .find -> é um metodo do mongoose para buscar registros no banco
            const games = await Game.find()
            return games

        // catch trata a falha
        } catch (error) {
            console.log(error)
        }
    }
}
// Exportando a classe
export default new gameService()