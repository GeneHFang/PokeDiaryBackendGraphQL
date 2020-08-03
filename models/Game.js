const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    type_of_game: String,
    version: String,
    trainerId: String,

});

module.exports = mongoose.model('Game', gameSchema); 