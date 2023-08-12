const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    evolution: {
        required: true,
        enum: ["Si", "No"]  
    }
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
