const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Eine einfache In-Memory-Buch-Datenbank
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

// let nextId = 2;
let nextId = 3; // richtige

app.use(bodyParser.json());

// GET-Route für ein Buch
app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send("Buch nicht gefunden");
  }
  res.json(book);
});

// DELETE-Route für ein Buch
app.delete("/book/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  console.log(index)
  if (index < 0 || !index) {
      res.status(404).send("Buch nicht vorhanden");
  } else {
      books.splice(index, 1);
      res.send(books);
  }
});

// Post-Route zum Hinzufügen eines Buches
app.post("/book", (req, res) => {
    console.log(req.body);
  if (!req.body.title || !req.body.author) {
    res.status(404).send("Titel oder Autor fehlt");
  } else {     
      const newBook = {
          id: nextId++,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook); // geändert um keine neue Referenzzuweisung zu erhalten
  res.status(201).send(books);
}
});

// Route, um alle Bücher abzurufen
app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

// Für test:
module.exports = {app, books};