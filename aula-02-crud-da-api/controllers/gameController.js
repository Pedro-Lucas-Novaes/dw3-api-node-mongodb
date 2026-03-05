// Importando o Service
import gameService from "../services/gameService.js";
// Importando o ObjectId
import { ObjectId } from "mongodb";

// Função para tratar a requisição de LISTAR os jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.status(200).json({ games: games });
    // Cod. 200 (OK) : Requisição Feita com sucesso
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Erro interno do servidor. Não foi possivel listar os jogos.",
      });
  }
};

// Função para tratar a requisição de CADASTRAR um jogo
const CreateGame = async (req, res) => {
  try {
    // DESESTRUTURAÇÃO
    // const title
    // const plataform
    // COLETANDO OS DADOS DO CORPO DA REQUISIÇÃO
    const { title, platform, year, price } = req.body;
    await gameService.Create(title, platform, year, price);
    res.status(201).json({ message: "O jogo foi cadastrado com sucesso!" });
    // Cod. 201 - CREATED - Um novo recurso foi criado no servidor.
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Erro interno do servidor. Não foi possivel cadastrar o jogo.",
      });
  }
};
// FUNÇÃO PARA DELETAR UM JOGO
const deleteGame = async (req, res) => {
  try {
    // COLETANDO A ID
    const id = req.params.id;
    // VALIDAÇÃO DO ID
    if (ObjectId.isValid(id)) {
      await gameService.Delete(id);
      res.status(204).json({ message: "O jogo foi excluido com sucesso!" });
      // Cod. 204 (NO CONTENT)
    } else {
      res.status(400).json({ error: "Ocorreu um erro de validação de ID." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// FUNÇÃO PARA ALTERAR UM JOGO
const updateGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const { title, platform, year, price } = req.body;
      await gameService.Update(id, title, platform, year, price);
      res.status(200).json({ message: "Jogo atualizado com sucesso!" });
    } else {
      res.status(400).json({ error: "Ocorreu um erro de validação de ID." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { getAllGames, CreateGame, deleteGame, updateGame };
