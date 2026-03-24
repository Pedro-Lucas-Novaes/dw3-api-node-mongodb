import mongoose from "mongoose";

// o campo "descriptions" será um documento aninhado
const descriptionSchema = new mongoose.Schema({
    genre : String, // genero
    platform : String, // plataforma
    rating : String, // classificação de idade
})

const gameSchema = new mongoose.Schema({
  title: String,
  year: Number,
  price: Number,
  descriptions : descriptionSchema

  // DEFININDO O CAMPO COMO ARRAY
  // descriptions : [descriptionSchema]
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
