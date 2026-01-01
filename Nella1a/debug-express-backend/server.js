const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET-Route für ein Buch
app.get('/book/:id', (req, res) => {
  const book = db.getBookById(Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }
  res.json(book);
});

// DELETE-Route für ein Buch
app.delete('/book/:id', (req, res) => {
  const deleted = db.deleteBookById(Number(req.params.id));
  if (!deleted) {
    return res.status(404).send({ error: 'Buch nicht gefunden' });
  }
  res.send('OK');
});

// Post-Route zum Hinzufügen eines Buches
app.post('/book', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Titel oder Autor fehlt' });
  }
  const newBook = db.addBook(title, author);
  res.json(newBook);
});

// Route, um alle Bücher abzurufen
app.get('/books', (req, res) => {
  const books = db.getAllBooks();
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = app;
