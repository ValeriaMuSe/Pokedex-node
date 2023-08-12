const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        match: /^https?:\/\/.*\.(jpeg|jpg|png)$/
    }
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
