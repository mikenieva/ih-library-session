// 1. IMPORTACIONES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2. SCHEMA
const authorSchema = new Schema({
  name: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  pictureUrl: String
})

// 3. MODELO
const Author = mongoose.model('Author', authorSchema)


// 4. EXPORTACIÓN
module.exports = Author;