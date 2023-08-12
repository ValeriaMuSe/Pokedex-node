// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Importar los módulos
// const controller = require('./modules/controller');
// const connection = require('./modules/dbConnection');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images'); // Directorio donde se guardarán las imágenes
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// app.use(express.urlencoded({ extended: true }));

// // Ruta para servir el formulario HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Ruta para servir las imágenes
// app.use('/images', express.static('images'));

// // Ruta para procesar el formulario con la imagen
// app.post('/pokemons', upload.single('image'), (req, res) => {
//   const { name, type, description, evolucion, debilidades } = req.body;
//   const imageUrl = req.file.filename;

//   // Aquí puedes guardar los datos en la base de datos o en memoria
//   // ...

//   res.json({ message: 'Pokémon registrado exitosamente.' });
// });

// // Llamar al controlador y conectar a la base de datos
// controller.server();
// connection().then(() => {
//   console.log('Database connected');
// }).catch(error => {
//   console.error('Database connection error:', error);
// });

// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Importar los módulos
// const controller = require('./modules/controller');
// const connection = require('./modules/dbConnection');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images'); // Directorio donde se guardarán las imágenes
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// app.use(express.urlencoded({ extended: true }));

// // Ruta para servir el formulario HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Ruta para servir las imágenes
// app.use('/images', express.static('images'));

// // Ruta para procesar el formulario con la imagen
// app.post('/pokemons', upload.single('image'), (req, res) => {
//   const { name, type, description, evolucion, debilidades } = req.body;
//   const imageUrl = req.file.filename;

//   // Aquí puedes guardar los datos en la base de datos o en memoria
//   // ...

//   res.json({ message: 'Pokémon registrado exitosamente.' });
// });

// // Llamar al controlador y conectar a la base de datos
// controller.handleConnection();
// connection().then(() => {
//   console.log('Database connected');
// }).catch(error => {
//   console.error('Database connection error:', error);
// });

// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });


const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Importar los módulos
const PokemonName = require('./modules/poke-name');
const PokemonImage = require('./modules/poke-image');
const PokemonType = require('./modules/poke-type');
const PokemonWeaknesses = require('./modules/poke-weaknesses');
const PokemonEvolution = require('./modules/poke-evolution');
const PokemonDescription = require('./modules/poke-description');
const routes = require('./modules/routes');
const db = require('./modules/dbConnection');

// Setup Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear los cuerpos de las solicitudes URL-encoded

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir las imágenes
app.use('/images', express.static('images'));

// Ruta para procesar el formulario con la imagen
app.post('/pokemons', upload.single('image'), async (req, res) => {
  const pokemonData = req.body;
  pokemonData.image = req.file.filename;
  
  // Crea un documento para cada uno de los modelos importados
  const newName = new PokemonName({ name: pokemonData.name });
  const newImage = new PokemonImage({ image: pokemonData.image });
  const newType = new PokemonType({ type: pokemonData.type });
  const newWeaknesses = new PokemonWeaknesses({ weaknesses: pokemonData.weaknesses });
  const newEvolution = new PokemonEvolution({ evolution: pokemonData.evolution });
  const newDescription = new PokemonDescription({ description: pokemonData.description });

  // Guarda cada documento en la base de datos
  await newName.save();
  await newImage.save();
  await newType.save();
  await newWeaknesses.save();
  await newEvolution.save();
  await newDescription.save();

await db.savePokemon(pokemonData);
  
  res.json({ message: 'Pokémon registrado exitosamente.' });
});

// Usa las rutas definidas en routes.js
app.use('/api', routes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

