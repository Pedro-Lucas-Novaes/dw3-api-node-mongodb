import express from "express";
// Importando o Mongoose
import mongoose from "mongoose";
// Importando o Model
import Game from "./models/Games.js"
// Importando as Rotas (Routes)
import gameRoutes from "./routes/gameRoutes.js";


const app = express();

// Configurações do Express
app.use(express.json()); // Permite o uso de JSON na aplicação

// ATIVANDO A UTILIZAÇÃO DAS ROTAS
app.use('/', gameRoutes)

// Iniciando a conexão com o banco de dados MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/api-the-games-novo")

// app.get("/", (req, res) => {
//   const games = [
//     {
//       title: "game 1",
//       year: "2020",
//       platform: "PC",
//       price: 20
//     },
//     {
//       title: "game 2",
//       year: "2024",
//       platform: "XBOX",
//       price: 20
//     }
//   ];

//   res.status(200).json(games);
// });

// Rodando a API na porta 4000
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API rodando em http://localhost:${port}`);
  }
});