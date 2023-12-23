// app.js
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/Book');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', async (req, res) => {
  const books = await Book.find({});
  res.render('index', { books });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', async (req, res) => {

  const {title, version, year, author} = req.body
  console.log(req.body)

  const book = new Book({title, version, year, author})

  await book.save();
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('edit', { book });
});

app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;

  const {title, version, year, author} = req.body
  console.log(req.body)
  await Book.findByIdAndUpdate(id, {
    title:title,
    version:version,
    year: year,
    author: author,

  });

  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect('/');
});

app.listen(5000, () => {
  console.log('Server started on port 3000');
});
