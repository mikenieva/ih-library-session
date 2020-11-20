const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// AGREGAR LIBRO
router.get('/books/add', (req, res, next) => {
  res.render("book-add");
})

router.post('/books/add', (req, res, next) => {
  // GENERADAS LAS VARIABLES
  const { title, author, description, rating } = req.body
  // LA INSTANCIA DEL NUEVO LIBRO
  const newBook = new Book({title, author, description, rating})

  // GUARDADO EN BASE DE DATOS
  newBook.save()
    .then((book) => {
      res.redirect('/books')
    })
    .catch((error) => {
      console.log(error)
    })      

})


// EDITAR LIBRO
router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
    .then((book) => {
      res.render("book-edit", {book})
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/books/edit', (req, res, next) => {
  const {title, author, description, rating} = req.body;

  Book.update({_id: req.query.book.id}, {$set : {title, author, description, rating}})
    .then(book => {
      res.redirect('/books')
    })
    .catch(error => console.log(error))
})

//  LIBRO ÚNICO
router.get('/books/:bookId', (req, res, next) => {
  console.log(req.params)
  Book.findOne({'_id': req.params.bookId})
    .then(theBook => {
      console.log(theBook)
      res.render('book-details', {book: theBook})
    })
    .catch(e => console.log(e))
})


// HOMEPAGE DE LIBROS ("/BOOKS")

router.get('/books', (req, res, next) => {
  Book.find()
    .then(libros => {
      console.log(`Todos los libros traídos:`, libros)
      res.render('books', {books: libros})
    })
    .catch(e => console.log(e))
  
})

module.exports = router;
