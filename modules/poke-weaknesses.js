const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    weaknesses: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'Un Pokémon debe tener al menos una debilidad.'
        }
    }
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
