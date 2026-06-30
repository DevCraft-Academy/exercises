const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const app = express();
const port = 3000;

// Eine einfache In-Memory-Buch-Datenbank
let books = [
  { id: "1", title: "1986", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

app.use(bodyParser.json());

// Route, um alle Bücher abzurufen
app.get("/books", (req, res) => {
  res.json(books);
});

// GET-Route für ein Buch
app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) {
    res.status(404).send("Buch nicht gefunden");
  }
  res.json(book);
});

// DELETE-Route für ein Buch
app.delete("/book/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    res.status(404).send("Buch nicht gefunden");
    return;
  }
  books.splice(index, 1);
  res.send("OK");
});

// Post-Route zum Hinzufügen eines Buches
app.post("/book", (req, res) => {
  if (!req.body.title?.trim().length || !req.body.author?.trim().length) {
    res.status(400).send("Titel oder Autor fehlt");
    return;
  }
  console.log("old books", books);
  const newBook = {
    id: uuidv4(),
    title: req.body.title,
    author: req.body.author,
  };

  books.push(newBook);
  res.send(newBook);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = app;
