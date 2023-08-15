const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;


const PokemonName = require('./modules/poke-name');
const PokemonImage = require('./modules/poke-image');
const PokemonType = require('./modules/poke-type');
const PokemonWeaknesses = require('./modules/poke-weaknesses');
const PokemonEvolution = require('./modules/poke-evolution');
const PokemonDescription = require('./modules/poke-description');
const routes = require('./modules/routes');
const db = require('./modules/dbConnection');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/images', express.static('images'));


app.post('/pokemons', upload.single('image'), async (req, res) => {
  const pokemonData = req.body;
  pokemonData.image = req.file.filename;
  
  
  const newName = new PokemonName({ name: pokemonData.name });
  const newImage = new PokemonImage({ image: pokemonData.image });
  const newType = new PokemonType({ type: pokemonData.type });
  const newWeaknesses = new PokemonWeaknesses({ weaknesses: pokemonData.weaknesses });
  const newEvolution = new PokemonEvolution({ evolution: pokemonData.evolution });
  const newDescription = new PokemonDescription({ description: pokemonData.description });


  await newName.save();
  await newImage.save();
  await newType.save();
  await newWeaknesses.save();
  await newEvolution.save();
  await newDescription.save();

await db.savePokemon(pokemonData);
  
  res.json({ message: 'Pokémon registrado exitosamente.' });
});


app.use('/api', routes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

