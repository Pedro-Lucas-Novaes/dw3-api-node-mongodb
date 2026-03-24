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
    res.status(500).json({
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
    const { title, year, price, descriptions } = req.body;
    await gameService.Create(title, year, price, descriptions);
    res.status(201).json({ message: "O jogo foi cadastrado com sucesso!" });
    // Cod. 201 - CREATED - Um novo recurso foi criado no servidor.
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      const { title, year, price, descriptions } = req.body;
      const game = await gameService.Update(
        id,
        title,
        year,
        price,
        descriptions,
      );
      res
        .status(200)
        .json({ message: "Jogo atualizado com sucesso!", game: game });
    } else {
      res.status(400).json({ error: "Ocorreu um erro de validação de ID." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// FUNÇÃO PARA BUSCAR UM JOGO UNICO
const getOneGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const game = await gameService.getOne(id);
      // Verificando se o jogo foi encontrado
      if (!game) {
        // Se o jogo não existir (! = NOT)
        res.status(404).json({ error: "O jogo buscando não foi encontrado." });
      } else {
        // JOGO ENCONTRADO
        res.status(200).json({ game });
      }
      // SE A ID FOR INVALIDA
    } else {
      res.status(400).json({ error: "A ID informada é invalida." });
      // COD. 400 - BAD REQUEST (Requisição mal formada)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { getAllGames, CreateGame, deleteGame, updateGame, getOneGame };
