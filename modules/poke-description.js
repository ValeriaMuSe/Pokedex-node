const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 500
    }
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
