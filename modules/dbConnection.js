const mongoose = require('mongoose')
const uri = `mongodb+srv://valeriams13:Al7EjEAdpD4c6oAK@cluster0.ogk8bi9.mongodb.net/`

module.exports = () => mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})


