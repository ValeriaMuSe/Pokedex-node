const express = require('express');
const router = express.Router();

// Importa los módulos de los controladores
const pokemonController = require('./pokemonController');
const PokemonName = require('./poke-name');
const PokemonImage = require('./poke-image');
const PokemonType = require('./poke-type');
const PokemonWeaknesses = require('./poke-weaknesses');
const PokemonEvolution = require('./poke-evolution');
const PokemonDescription = require('./poke-description');

// Ruta para listar los pokémon
router.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await pokemonController.getPokemons();
    const pokemonNames = PokemonName.getPokemonNames(pokemons);
    const pokemonData = {
      pokemons: pokemons,
      names: pokemonNames
    };
    res.json(pokemonData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pokémon.' });
  }
});

// Ruta para obtener un pokémon por su ID
router.get('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await pokemonController.getPokemonById(req.params.id);
    if (pokemon) {
      const pokemonName = PokemonName.getPokemonName(pokemon);
      const pokemonImage = PokemonImage.getPokemonImage(pokemon);
      const pokemonType = PokemonType.getPokemonType(pokemon);
      const pokemonWeaknesses = PokemonWeaknesses.getPokemonWeaknesses(pokemon);
      const pokemonEvolution = PokemonEvolution.getPokemonEvolution(pokemon);
      const pokemonDescription = PokemonDescription.getPokemonDescription(pokemon);

      const pokemonData = {
        id: pokemon._id,
        name: pokemonName,
        image: pokemonImage,
        type: pokemonType,
        weaknesses: pokemonWeaknesses,
        evolution: pokemonEvolution,
        description: pokemonDescription
      };

      res.json(pokemonData);
    } else {
      res.status(404).json({ message: 'Pokémon no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pokémon.' });
  }
});

// Exporta las rutas
module.exports = router;
