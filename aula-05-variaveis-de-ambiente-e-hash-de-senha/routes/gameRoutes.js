import express from "express";
import gameController from "../controllers/gameController.js";
const gameRoutes = express.Router();
// Importando o Middleware de autenticação
import Auth from "../middleware/Auth.js";

// Na camada de routes é armazenado os ENDPOINTS (URLs) da API

// Endpoint para listar todos os games
gameRoutes.get("/games",Auth.Authorization, gameController.getAllGames);

// Endpoint para cadastrar um game
gameRoutes.post("/games",Auth.Authorization, gameController.CreateGame);

// Endpoint para excluir um game
gameRoutes.delete("/games/:id",Auth.Authorization, gameController.deleteGame);

// Endpoint para alterar um game
gameRoutes.put("/games/:id",Auth.Authorization, gameController.updateGame);

// Endpoint para listar um game unico
gameRoutes.get("/games/:id",Auth.Authorization, gameController.getOneGame)

export default gameRoutes;
