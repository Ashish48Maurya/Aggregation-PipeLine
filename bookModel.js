const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  author_id: Number,
  genre: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
