const express = require('express');
const route = express.Router();
const {allPokemons, addPokemon, deletePokemon, editPokemon} = require('../controller/pokedexController')

route.get("/allPokemons",allPokemons);
route.post("/addPokemon",addPokemon);
route.delete("/deletePokemon/:id",deletePokemon);
route.put("/editPokemon/edit",editPokemon);

module.exports = route;