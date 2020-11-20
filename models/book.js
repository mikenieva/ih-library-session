// 1. IMPORTACIONES
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// 2. SCHEMA

const bookSchema = new Schema({
  title: String,
  description: String,
  author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
  rating: Number,
  reviews: [{
    user: String,
    comments: String
  }]
},{
  timeStamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// 3. MODELO
const Book = mongoose.model('Book', bookSchema)

// 4. EXPORTACIÓN
module.exports = Book;