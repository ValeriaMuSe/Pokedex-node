
const mongoose = require('mongoose');

const dbConnectionURL = 'mongodb+srv://valeriams13:Al7EjEAdpD4c6oAK@cluster0.ogk8bi9.mongodb.net/pokedex';

mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión establecida con MongoDB Atlas'))
    .catch(err => console.error('Error al conectar con MongoDB Atlas', err));