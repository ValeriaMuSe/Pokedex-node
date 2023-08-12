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

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Importar los módulos
const controller = require('./modules/controller');
const connection = require('./modules/dbConnection');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir las imágenes
app.use('/images', express.static('images'));

// Ruta para procesar el formulario con la imagen
app.post('/pokemons', upload.single('image'), (req, res) => {
  const { name, type, description, evolucion, debilidades } = req.body;
  const imageUrl = req.file.filename;

  // Aquí puedes guardar los datos en la base de datos o en memoria
  // ...

  res.json({ message: 'Pokémon registrado exitosamente.' });
});

// Llamar al controlador y conectar a la base de datos
controller.handleConnection();
connection().then(() => {
  console.log('Database connected');
}).catch(error => {
  console.error('Database connection error:', error);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
