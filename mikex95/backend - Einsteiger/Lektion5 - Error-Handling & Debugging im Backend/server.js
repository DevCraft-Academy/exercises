const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let books = [
  { id: 1, titel: "1984", author: "George Orwell" },
  { id: 2, titel: "Hello World Book", author: "Aldous Huxley" },
];

let nextId = 3;

app.use(bodyParser.json());

app.get("/book/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id, 10));
  if (!book) {
    return res.status(404).send("book not found");
  }
  res.json(book);
});

app.delete("/book/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).send("book not found");
  }
  books.splice(index, 1);
  res.send("OK");
});

app.post("/book", (req, res) => {
  if (!req.body.titel || !req.body.author) {
    return res.status(400).send("title or author missing");
  }
  const newBook = {
    id: nextId++,
    titel: req.body.titel,
    author: req.body.author,
  };
  books.push(newBook);
  res.send(newBook);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = app; // Export für die Tests
