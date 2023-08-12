const PokemonName = require('./poke-name');
const PokemonImage = require('./poke-image');
const PokemonType = require('./poke-type');
const PokemonWeaknesses = require('./poke-weaknesses');
const PokemonEvolution = require('./poke-evolution');
const PokemonDescription = require('./poke-description');

// Controlador para obtener la lista de pokémon
exports.getPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    const pokemonNames = PokemonName.getPokemonNames(pokemons);
    const pokemonData = {
      pokemons: pokemons,
      names: pokemonNames
    };
    res.json(pokemonData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pokémon.' });
  }
};

// Controlador para obtener un pokémon por su ID
exports.getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
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
};
