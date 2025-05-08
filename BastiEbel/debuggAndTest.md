const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Eine einfache In-Memory-Buch-Datenbank
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

let nextId = 3;

app.use(bodyParser.json());

// GET-Route für ein Buch
app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Buch nicht gefunden");
  }
  res.json(book);
});

// DELETE-Route für ein Buch
app.delete("/book/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Buch nicht gefunden");
  }
  books.splice(index, 1);
  res.send("OK");
});

// Post-Route zum Hinzufügen eines Buches
app.post("/book", (req, res) => {
  if (!req.body.title || !req.body.author) {
    res.status(400).send("Titel oder Autor fehlt");
  }
  const newBook = {
    id: nextId++,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.send(newBook);
});

// Route, um alle Bücher abzurufen
app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = app;
