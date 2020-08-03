const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: String,
    species: String,
    img: String,
    gameId: String

});

module.exports = mongoose.model('Pokemon', pokemonSchema); 