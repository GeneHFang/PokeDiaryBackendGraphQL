const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    name: String,

});

module.exports = mongoose.model('Trainer', trainerSchema); 