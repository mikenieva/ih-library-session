const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js')
const Author = require('../models/author.js')


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

// CREAR AUTORES

// GET - HACIENDO UNA PETICIÓN AL SERVIDOR SIN MANDAR INFO PRIVADA
router.get('/authors/add', (req, res, next) => {
  res.render('author-add');
})

// POST - SE REFIERE A ENVIAR INFORMACIÓN HACIA EL SERVIDOR DE MANERA PRIVADA Y HACIENDO UNA PETICIÓN.
router.post('/authors/add', (req, res, next) => {
  console.log(req.body)
  const { name, lastName, nationality, birthday, pictureUrl} = req.body;
  const newAuthor = new Author({
    name,
    lastName,
    nationality,
    birthday,
    pictureUrl
  })

  newAuthor
    .save()
    .then(book => {
      res.redirect('/books')
    })
    .catch(error => {
      console.log(error)
    })
})

// localhost:3000/book/ertyjn23guikjjhdalkj2h34
router.get('/book/:id', (req, res, next) => {

    console.log(req.params)
    const bookId = req.params.id;

    // REGEX
    if(!/^[0-9a-fA-F]{24}$/.test(bookId)){
      return res.status(404).render('not-found');
    }

    console.log("Aquí vamos")
    Book.findOne({_id: bookId})
    .populate('author')
    .then(book => {
      console.log(book)
      if (!book) {
        return res.status(404).render('not-found')
      }

      res.render('book-detail', {book})

    })
    .catch(next)

})


// COMENTARIOS
router.post('/reviews/add', (req, res, next) => {
  console.log(req.body)
  const { user, comments } = req.body;

  Book.update(
    {_id: req.query.book_id},
    { $push: {reviews: {user, comments}}}
  )
  .then(book => {
    res.redirect('/books')
  })
  .catch(error => next(error))

})

module.exports = router;
